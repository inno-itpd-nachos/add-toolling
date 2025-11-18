import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to provide a virtual module for @excalidraw/excalidraw/types
// These are type-only imports that will be stripped out by TypeScript
const excalidrawTypesPlugin = () => ({
  name: 'excalidraw-types-virtual-module',
  resolveId(id: string) {
    if (id === '@excalidraw/excalidraw/types') {
      return '\0virtual:excalidraw-types'
    }
    return null
  },
  load(id: string) {
    if (id === '\0virtual:excalidraw-types') {
      // Return an empty module since type-only imports are stripped by TypeScript
      return 'export {}'
    }
    return null
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    excalidrawTypesPlugin(),
  ],
  build: {
    outDir: 'out',
  },
  resolve: {
    alias: {
      'lib': '/src/lib',
      'components': '/src/components',
      'store': '/src/store',
      'utils': '/src/utils',
      'modules': '/src/modules',
      'constants': '/src/constants',
      'types': '/src/types',
    },
  },
})
