import { useEffect, useState, useRef, type FC } from "react"
import {
  Excalidraw,
  serializeLibraryAsJSON,
} from "@excalidraw/excalidraw"

import "@excalidraw/excalidraw/index.css"

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
  const setExcalidrawApi = useStore(store => store.setExcalidrawApi)
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

  return (
    <Excalidraw
      excalidrawAPI={(api) => setExcalidrawApi(api)}
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
          JSON.stringify(libraryItems) ===
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
