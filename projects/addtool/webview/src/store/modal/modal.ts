import type { StateCreator } from 'zustand'

export type ModalId = string

export interface ModalsSlice {
  modals: Record<ModalId, boolean>
  registeredModals: Set<ModalId>
  registerModal: (id: ModalId, initialState?: boolean) => void
  unregisterModal: (id: ModalId) => void
  openModal: (id: ModalId) => void
  closeModal: (id: ModalId) => void
  toggleModal: (id: ModalId) => void
  closeAllModals: () => void
}

export const createModalsSlice: StateCreator<ModalsSlice> = (set) => ({
  modals: {},
  registeredModals: new Set(),
  
  registerModal: (id, initialState = false) =>
    set((state) => {
      if (state.registeredModals.has(id)) {
        console.warn(`Modal "${id}" is already registered`)
        return state
      }
      
      const newRegisteredModals = new Set(state.registeredModals)
      newRegisteredModals.add(id)
      
      return {
        registeredModals: newRegisteredModals,
        modals: { ...state.modals, [id]: initialState },
      }
    }),
  
  unregisterModal: (id) =>
    set((state) => {
      if (!state.registeredModals.has(id)) {
        console.warn(`Modal "${id}" is not registered`)
        return state
      }
      
      const newRegisteredModals = new Set(state.registeredModals)
      newRegisteredModals.delete(id)
      
      const {[id]: _, ...remainingModals} = state.modals
      
      return {
        registeredModals: newRegisteredModals,
        modals: remainingModals,
      }
    }),
  
  openModal: (id) =>
    set((state) => {
      if (!state.registeredModals.has(id)) {
        console.warn(`Cannot open unregistered modal "${id}"`)
        return state
      }
      return {
        modals: { ...state.modals, [id]: true },
      }
    }),
  
  closeModal: (id) =>
    set((state) => {
      if (!state.registeredModals.has(id)) {
        console.warn(`Cannot close unregistered modal "${id}"`)
        return state
      }
      return {
        modals: { ...state.modals, [id]: false },
      }
    }),
  
  toggleModal: (id) =>
    set((state) => {
      if (!state.registeredModals.has(id)) {
        console.warn(`Cannot toggle unregistered modal "${id}"`)
        return state
      }
      return {
        modals: { ...state.modals, [id]: !state.modals[id] },
      }
    }),
  
  closeAllModals: () =>
    set((state) => {
      const closedModals = Object.keys(state.modals).reduce((acc, id) => {
        acc[id] = false
        return acc
      }, {} as Record<ModalId, boolean>)
      
      return {
        modals: closedModals,
      }
    }),
})

