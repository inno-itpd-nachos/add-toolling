import {
  hashElementsVersion,
  loadFromBlob,
  loadLibraryFromBlob,
} from "@excalidraw/excalidraw"

import type {
  ExcalidrawInitialDataState,
  AppState,
  BinaryFiles,
} from "@excalidraw/excalidraw/types"

import { Base64 } from "js-base64"

import { sendChangesToVSCode, vscode } from "lib/vscode"
import { useEffect, useState } from "react"
import type { UmlComponentEditorProps } from "types/uml-component"
import { useStore } from "store"



import * as _ from 'lodash'


const mimeTypeFallbacks = {
  "application/json": ["image/png", "image/svg+xml"],
  "image/svg+xml": ["application/json", "image/png"],
  "image/png": ["application/json", "image/svg+xml"],
}


async function getInitialData(
  content: Uint8Array,
  contentType: string
): Promise<[ExcalidrawInitialDataState, string]> {
  const potentialContentTypes = [
    contentType,
    ...mimeTypeFallbacks[contentType as keyof typeof mimeTypeFallbacks],
  ]
  for (const contentType of potentialContentTypes) {
    try {
      const initialData = await loadFromBlob(
        new Blob(
          [
            contentType == "image/png"
              ? content.slice()
              : new TextDecoder().decode(content),
          ],
          { type: contentType }
        ),
        null,
        null
      )

      return [{ ...initialData }, contentType]
    } catch (_) { /* empty */ }
  }

  throw new Error("Unable to load initial data")
}

function getExcalidrawConfig(rootElement: HTMLElement) {
  const b64Config = rootElement.getAttribute("data-addt-config")
  if (!b64Config) {
    throw Error("data-addt-config attribute is missing")
  }
  const strConfig = Base64.decode(b64Config)
  return JSON.parse(strConfig)
}

async function getLibraryItems(libraryString: string) {
  try {
    return await loadLibraryFromBlob(
      new Blob([libraryString], { type: "application/json" })
    )
  } catch (e) {
    vscode.postMessage({
      type: "error",
      content: `Failed to load library: ${e}`,
    })
    return []
  }
}

async function initialize(set: (props: UmlComponentEditorProps) => void) {
  try {
    const rootElement = document.getElementById("root")
    if (!rootElement) {
      throw Error("root element is missing")
    }
    const config = await getExcalidrawConfig(rootElement)

    const [initialData, initialContentType] =
      config.content.length > 0
        ? await getInitialData(
          new Uint8Array(config.content),
          config.contentType
        )
        : [undefined, config.contentType]

    const sendChanges = sendChangesToVSCode(config.contentType)
    const debouncedOnChange = (
      onChange: (
        elements: readonly unknown[],
        appState: Partial<AppState>,
        files: BinaryFiles
      ) => void,
      initialVersion: number
    ) => {
      let previousVersion = initialVersion

      return _.debounce((elements, appState, files) => {
        const currentVersion = hashElementsVersion(elements)
        if (currentVersion !== previousVersion) {
          previousVersion = currentVersion
          onChange(elements, appState, files)
        }
      }, 250)
    }

    const isDirty = !initialData || config.contentType != initialContentType

    set({
      initialData,
      name: config.name,
      dirty: isDirty,
      libraryItems: await getLibraryItems(config.library),
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
  const [inited, setInited] = useState(false)
  const umlComponentSetEditorProps = useStore(store => store.umlComponentSetEditorProps)

  useEffect(() => {
    if (inited) {
      return
    }
    void initialize(umlComponentSetEditorProps)
    setInited(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
