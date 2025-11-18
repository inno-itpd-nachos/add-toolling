import type { AppState, BinaryFiles, ExcalidrawInitialDataState, LibraryItems } from "@excalidraw/excalidraw/types"

export type UmlComponentEditorProps = {
  initialData?: ExcalidrawInitialDataState;
  name: string;
  libraryItems: LibraryItems;
  dirty: boolean;
  viewModeEnabled: boolean
  onChange: (
    elements: readonly unknown[],
    appState: Partial<AppState>,
    files?: BinaryFiles
  ) => void
  imageParamsProp: {
    exportBackground: boolean;
    exportWithDarkMode: boolean;
    exportScale: 1 | 2 | 3;
  }
  langCodeProp: string
}
