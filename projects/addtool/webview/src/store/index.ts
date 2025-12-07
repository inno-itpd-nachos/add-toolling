import { create } from 'zustand'
import { createModalsSlice, type ModalsSlice } from './modal'
import { createTabSlice, type TabSlice } from './tab'
import { createTableAddSlice, type TableAddSlice } from './table-add'
import { createThemeSlice, type ThemeSlice } from './theme'
import { createUmlComponentSlice, type UmlComponentSlice } from './uml-component'
import { createExcalidrawApiSlice, type ExcalidrawApiSlice } from './excalidraw-api'

export type StoreState = ModalsSlice & TabSlice & ThemeSlice & UmlComponentSlice & TableAddSlice & ExcalidrawApiSlice

export const useStore = create<StoreState>()((...a) => ({
  ...createModalsSlice(...a),
  ...createTabSlice(...a),
  ...createThemeSlice(...a),
  ...createUmlComponentSlice(...a),
  ...createTableAddSlice(...a),
  ...createExcalidrawApiSlice(...a),
}))
