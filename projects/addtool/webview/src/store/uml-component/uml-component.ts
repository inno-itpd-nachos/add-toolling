import type { UmlComponentEditorProps } from 'types/uml-component'
import type { StateCreator } from 'zustand'

export interface UmlComponentSlice {
  umlComponentEditorProps: UmlComponentEditorProps | null
  umlComponentSetEditorProps: (props: UmlComponentEditorProps) => void
}

export const createUmlComponentSlice: StateCreator<UmlComponentSlice> = (set, _get) => ({
  umlComponentEditorProps: null,
  umlComponentSetEditorProps: (props: UmlComponentEditorProps) => set({ umlComponentEditorProps: props }),
})

