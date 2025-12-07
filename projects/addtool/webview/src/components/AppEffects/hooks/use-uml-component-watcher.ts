import {
  hashElementsVersion,
  loadFromBlob,
  loadLibraryFromBlob,
} from "@excalidraw/excalidraw"
import type {
  AppState,
  BinaryFiles,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types"
import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types"

import { Base64 } from "js-base64"

import { sendChangesToVSCode, vscode } from "lib/vscode"
import { useEffect, useRef, type RefObject } from "react"
import type { UmlComponentEditorProps } from "types/uml-component"
import type { FileContent, FileContentE } from "types/content"
import { useStore } from "store"

// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from 'lodash'


const sendChanges = sendChangesToVSCode('application/json')

const textDecoder = new TextDecoder()

const _mimeTypes = [
  'application/json',
  'image/svg+xml',
  'image/png'
]

const selectDrawerExcalidraw = (content: string) => {
  return JSON.stringify(JSON.parse(content)?.drawer?.excalidraw)
}

const _selectDrawerDrawio = (content: string) => {
  return JSON.stringify(JSON.parse(content)?.drawer?.drawio)
}

async function getInitialData(
  content: string,
  current?: FileContentE['drawer']['excalidraw']
): Promise<[ExcalidrawInitialDataState, string]> {
  console.log('getInitialData', content)
  try {
    if (current) {
      return [{...current}, 'application/json']
    }
    const initialData = await loadFromBlob(
      new Blob(
        [
          selectDrawerExcalidraw(content),
        ],
        { type: 'application/json'}
      ),
      null,
      null
    )
    return [{ ...initialData }, 'application/json']
  } catch (_) { 
    throw new Error("Unable to load initial data")
  }
}

function getAddtConfig(rootElement: HTMLElement) {
  const b64Config = rootElement.getAttribute("data-addt-config")
  if (!b64Config) {
    throw Error("data-addt-config attribute is missing")
  }
  const strConfig = Base64.decode(b64Config)
  return JSON.parse(strConfig)
}

async function _getLibraryItems(libraryString: string) {
  console.log('getLibraryItems', libraryString)
  try {
    return await loadLibraryFromBlob(
      new Blob([libraryString], { type: "application/json" })
    )
  } catch (e) {
    vscode.postMessage({
      type: "error",
      content: `[webview] Failed to load library: ${e}`,
    })
    return []
  }
}

type InitializeProps = {
  umlComponentSetEditorProps: (props: UmlComponentEditorProps) => void
  setComponents: (v: Record<string, string>) => void
  setAttributes: (v: Record<string, string>) => void
  setAttributesToComponentsScore: (v: Record<string, Record<string, number>>) => void
  contentRef: RefObject<FileContentE>
}

async function initialize({
  umlComponentSetEditorProps,
  setComponents,
  setAttributes,
  setAttributesToComponentsScore,
  contentRef,
}: InitializeProps) {
  try {
    const rootElement = document.getElementById("root")
    if (!rootElement) {
      throw Error("root element is missing")
    }

    const config = await getAddtConfig(rootElement)

    const decodedContent = textDecoder.decode(new Uint8Array(config.content))
    const parsedContent = JSON.parse(decodedContent)

    setComponents(parsedContent.components)
    setAttributes(parsedContent.attributes)
    setAttributesToComponentsScore(parsedContent.attributesToComponentsScore)

    const [initialData, initialContentType] =
      config.content.length > 0
        ? await getInitialData(decodedContent)
        : [undefined, config.contentType]
    
    console.log('initialize', config, initialData, initialContentType)

    const putDrawerIntoContentRef = (elements?: readonly ExcalidrawElement[] | null, appState?: Partial<AppState> | null, files?: BinaryFiles) => {
      const drawer = {excalidraw: {type: 'excalidraw', elements: elements || [], appState: appState || {}, files}} as const
      const content = {
        ...contentRef.current,
        drawer
      }
      contentRef.current = content
    }

    const debouncedOnChange = (
      onChange: (
        content: FileContent
      ) => void,
      initialVersion: number
    ) => {
      let previousVersion = initialVersion

      return _.debounce((elements: readonly ExcalidrawElement[], appState: Partial<AppState>, files?: BinaryFiles) => {
        const currentVersion = hashElementsVersion(elements)
        if (currentVersion !== previousVersion) {
          previousVersion = currentVersion
          putDrawerIntoContentRef(elements, appState, files)
          console.log('appeffects', contentRef.current)
          onChange(contentRef.current)
        }
      }, 250)
    }

    const isDirty = !initialData || config.contentType !== initialContentType

    putDrawerIntoContentRef(initialData?.elements, initialData?.appState, initialData?.files)

    umlComponentSetEditorProps({
      initialData,
      name: config.name,
      dirty: isDirty,
      libraryItems: [],
      // libraryItems: await getLibraryItems(config.library),
      viewModeEnabled: config.viewModeEnabled,
      onChange: debouncedOnChange(
        sendChanges,
        isDirty ? -1 : hashElementsVersion(initialData.elements || [])
      ),
      imageParamsProp: config.imageParams,
      langCodeProp: config.langCode
    })

  } catch (error) {
    vscode.postMessage({
      type: "error",
      content: `Failed to load Document: ${error}`,
    })
  }
}

export function useUmlComponentWatcher() {
  const umlComponentSetEditorProps = useStore(store => store.umlComponentSetEditorProps)
  const attributes = useStore(store => store.attributes)
  const components = useStore(store => store.components)
  const attributesToComponentsScore = useStore(store => store.attributesToComponentsScore)
  const setAttributes = useStore(store => store.setAttributes)
  const setComponents = useStore(store => store.setComponents)
  const setAttributesToComponentsScore = useStore(store => store.setAttributesToComponentsScore)

  const nonContent = {
    attributes,
    components,
    attributesToComponentsScore,
  }
  
  const contentRef = useRef<FileContentE>({
    ...nonContent,
    drawer: {
      excalidraw: {
        type: 'excalidraw',
        elements: [],
        appState: {},
        files: undefined
      }
    }
  })
  contentRef.current = {
    ...contentRef.current,
    ...nonContent
  }
  const initedRef = useRef<boolean>(false)

  useEffect(() => {
    if (initedRef.current) {
      return
    }
    void initialize({
      umlComponentSetEditorProps,
      setAttributes,
      setComponents,
      setAttributesToComponentsScore,
      contentRef
    }).finally(() => {
      initedRef.current = true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('effect2', initedRef.current, contentRef.current)
    if (!initedRef.current) {
      return
    }

    const content = {
      ...contentRef.current,
      drawer: {
        excalidraw: {
          ...contentRef.current.drawer.excalidraw,
        }
      }
    }
    console.log('appeffects2', content)
    sendChanges(content)
  }, [attributes, attributesToComponentsScore, components])
}
