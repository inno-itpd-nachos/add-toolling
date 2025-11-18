import { useEffect, useState, useRef, type FC } from "react"
import {
  Excalidraw,
  loadLibraryFromBlob,
  serializeLibraryAsJSON,
} from "@excalidraw/excalidraw"

import "@excalidraw/excalidraw/index.css"

import type {
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types"
import { vscode } from "lib/vscode"
import { useStore } from "store"
import { EXTENSION } from "constants/vscode"
import type { UmlComponentEditorProps } from "types/uml-component"

import "./styles.css"

export const Editor: FC = () => {
  const props = useStore(store => store.umlComponentEditorProps)

  if (!props) {
    return null
  }

  return <EditorInner {...props} />
}

const EditorInner: FC<UmlComponentEditorProps> = ({ initialData, name, libraryItems, dirty, onChange, langCodeProp, imageParamsProp, viewModeEnabled }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()
  const libraryItemsRef = useRef(libraryItems)
  const [imageParams] = useState(imageParamsProp)
  const [langCode] = useState(langCodeProp)
  const theme = useStore(store => store.theme)

  useEffect(() => {
    if (!dirty) {
      return
    }
    if (initialData) {
      const { elements, appState, files } = initialData
      onChange(elements || [], appState || {}, files)
    } else {
      onChange([], { viewBackgroundColor: "#ffffff" }, {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = async (e: any) => {
      try {
        const message = e.data
        switch (message.type) {
          case "library-change": {
            const blob = new Blob([message.library], {
              type: "application/json",
            })
            const libraryItems = await loadLibraryFromBlob(blob)
            if (
              JSON.stringify(libraryItems) ==
              JSON.stringify(libraryItemsRef.current)
            ) {
              return
            }
            libraryItemsRef.current = libraryItems
            excalidrawAPI?.updateLibrary({
              libraryItems,
              merge: message.merge,
              openLibraryMenu: !message.merge,
            })
            break
          }
          // case "theme-change": {
          //   setThemeConfig(message.theme)
          //   break
          // }
          // case "language-change": {
          //   setLangCode(message.langCode)
          //   break
          // }
          // case "image-params-change": {
          //   setImageParams(message.imageParams)
          // }
        }
      } catch (e) {
        vscode.postMessage({
          type: "error",
          content: (e as Error).message,
        })
      }
    }
    window.addEventListener("message", listener)

    return () => {
      window.removeEventListener("message", listener)
    }
  }, [excalidrawAPI])

  return (
    <Excalidraw
      excalidrawAPI={(api) => setExcalidrawAPI(api)}
      UIOptions={{
        canvasActions: {
          loadScene: false,
          saveToActiveFile: false,
        },
      }}
      langCode={langCode}
      name={name}
      theme={theme}
      viewModeEnabled={viewModeEnabled}
      initialData={{
        ...initialData,
        libraryItems: libraryItems,
        scrollToContent: true,
      }}
      libraryReturnUrl={`${EXTENSION.VSCODE_LINK}/importLib`}
      onChange={(elements, appState, files) =>
        onChange(
          elements,
          { ...appState, ...imageParams, exportEmbedScene: true },
          files
        )
      }
      onLinkOpen={(element, event) => {
        vscode.postMessage({
          type: "link-open",
          url: element.link,
        })
        event.preventDefault()
      }}
      onLibraryChange={(libraryItems) => {
        if (
          JSON.stringify(libraryItems) ==
          JSON.stringify(libraryItemsRef.current)
        ) {
          return
        }
        libraryItemsRef.current = libraryItems
        vscode.postMessage({
          type: "library-change",
          library: serializeLibraryAsJSON(libraryItems),
        })
      }}
    />
  )
}
