import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types"
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types"

type ExcalidrawDrawerOptions = {
  type: 'excalidraw'
  elements: readonly ExcalidrawElement[]
  appState: Partial<AppState>
  files?: BinaryFiles
}

type DrawioDrawerOptions = {
  type: 'drawio'
}

type FileContentBase<Drawer> = {
  attributesToComponentsScore: Record<string, Record<string, number>>
  components: Record<string, string>
  attributes: Record<string, string>
  drawer: Drawer
}

type EDrawer = {excalidraw: ExcalidrawDrawerOptions}
type DDrawer = {drawio: DrawioDrawerOptions}

export type FileContentE = FileContentBase<EDrawer>
export type FileContentD = FileContentBase<DDrawer>
export type FileContent = FileContentE | FileContentD
