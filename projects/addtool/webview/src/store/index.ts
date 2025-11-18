import { create } from 'zustand'
import { createModalsSlice, type ModalsSlice } from './modal'
import { createTabSlice, type TabSlice } from './tab'
import { createThemeSlice, type ThemeSlice } from './theme'
import { createUmlComponentSlice, type UmlComponentSlice } from './uml-component'

export type StoreState = ModalsSlice & TabSlice & ThemeSlice & UmlComponentSlice

export const useStore = create<StoreState>()((...a) => ({
  ...createModalsSlice(...a),
  ...createTabSlice(...a),
  ...createThemeSlice(...a),
  ...createUmlComponentSlice(...a),
}))
