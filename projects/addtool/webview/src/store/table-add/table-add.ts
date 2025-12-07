import type { StateCreator } from 'zustand'

export interface TableAddSlice {
  components: Record<string, string> // id to name
  attributes: Record<string, string> // id to name
  attributesToComponentsScore: Record<string, Record<string, number>> // attribute id to record of component id to number

  // Component CRUD
  setComponents: (v: Record<string, string>) => void
  addComponent: (id: string, name: string) => void
  updateComponent: (id: string, name: string) => void
  deleteComponent: (id: string) => void

  // Attribute CRUD
  setAttributes: (v: Record<string, string>) => void
  addAttribute: (id: string, name: string) => void
  updateAttribute: (id: string, name: string) => void
  deleteAttribute: (id: string) => void

  // Cell value operations
  setAttributesToComponentsScore: (v: Record<string, Record<string, number>>) => void
  setCellValue: (componentId: string, attributeId: string, value: number) => void
  getCellValue: (componentId: string, attributeId: string) => number | undefined
}

export const createTableAddSlice: StateCreator<TableAddSlice> = (set, get) => ({
  components: {},
  attributes: {},
  attributesToComponentsScore: {},

  // Component CRUD
  setComponents: (components) => set(() => ({components})),

  addComponent: (id, name) =>
    set((state) => ({
      components: {
        ...state.components,
        [id]: name,
      },
    })),

  updateComponent: (id, name) =>
    set((state) => ({
      components: {
        ...state.components,
        [id]: name,
      },
    })),

  deleteComponent: (id) =>
    set((state) => {
      // Remove the component
      const newComponents = { ...state.components }
      delete newComponents[id]

      // Remove all scores associated with this component
      const newScores = { ...state.attributesToComponentsScore }
      Object.keys(newScores).forEach((attributeId) => {
        if (newScores[attributeId][id] !== undefined) {
          newScores[attributeId] = { ...newScores[attributeId] }
          delete newScores[attributeId][id]
        }
      })

      return {
        components: newComponents,
        attributesToComponentsScore: newScores,
      }
    }),

  // Attribute CRUD
  setAttributes: (attributes) => set(() => ({attributes})),

  addAttribute: (id, name) =>
    set((state) => ({
      attributes: {
        ...state.attributes,
        [id]: name,
      },
      attributesToComponentsScore: {
        ...state.attributesToComponentsScore,
        [id]: {},
      },
    })),

  updateAttribute: (id, name) =>
    set((state) => ({
      attributes: {
        ...state.attributes,
        [id]: name,
      },
    })),

  deleteAttribute: (id) =>
    set((state) => {
      // Remove the attribute
      const newAttributes = { ...state.attributes }
      delete newAttributes[id]

      // Remove all scores associated with this attribute
      const newScores = { ...state.attributesToComponentsScore }
      delete newScores[id]

      return {
        attributes: newAttributes,
        attributesToComponentsScore: newScores,
      }
    }),

  // Cell value operations
  setAttributesToComponentsScore: (attributesToComponentsScore) => set(() => ({attributesToComponentsScore})),

  setCellValue: (componentId, attributeId, value) =>
    set((state) => ({
      attributesToComponentsScore: {
        ...state.attributesToComponentsScore,
        [attributeId]: {
          ...state.attributesToComponentsScore[attributeId],
          [componentId]: value,
        },
      },
    })),

  getCellValue: (componentId, attributeId) => {
    return get().attributesToComponentsScore[attributeId]?.[componentId]
  },
})

