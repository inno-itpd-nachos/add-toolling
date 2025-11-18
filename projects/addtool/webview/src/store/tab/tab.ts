import type { StateCreator } from 'zustand'

export type TabId = 'uml_component' | 'table_add'

export interface TabSlice {
  currentTab: TabId
  setTab: (tab: TabId) => void
}

export const createTabSlice: StateCreator<TabSlice> = (set) => ({
  currentTab: 'uml_component',
  
  setTab: (tab) =>
    set(() => ({
      currentTab: tab,
    })),
})

