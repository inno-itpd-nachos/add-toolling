import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'
import type { StateCreator } from 'zustand'

export interface ExcalidrawApiSlice {
  excalidrawApi: ExcalidrawImperativeAPI | null
  setExcalidrawApi: (api: ExcalidrawImperativeAPI) => void
}

export const createExcalidrawApiSlice: StateCreator<ExcalidrawApiSlice> = (set, _get) => ({
  excalidrawApi: null,
  setExcalidrawApi: (excalidrawApi) => {
    set({excalidrawApi})
  }
})

