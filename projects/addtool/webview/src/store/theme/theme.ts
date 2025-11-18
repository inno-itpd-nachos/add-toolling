import type { StateCreator } from 'zustand'

export type ThemeMode = 'light' | 'dark'
export type ThemeConfig = 'light' | 'dark' | 'auto'

export interface ThemeSlice {
  themeConfig: ThemeConfig
  theme: ThemeMode
  setThemeConfig: (config: ThemeConfig) => void
  setTheme: (theme: ThemeMode) => void
}

export function detectVSCodeTheme(): ThemeMode {
  switch (document.body.className) {
    case 'vscode-dark':
      return 'dark'
    case 'vscode-light':
      return 'light'
    default:
      return 'light'
  }
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set, _get) => ({
  themeConfig: 'auto',
  theme: detectVSCodeTheme(),

  setThemeConfig: (config) =>
    set(() => {
      const newTheme = config === 'auto' ? detectVSCodeTheme() : config
      return {
        themeConfig: config,
        theme: newTheme,
      }
    }),

  setTheme: (theme) =>
    set(() => ({
      theme,
    })),
})

