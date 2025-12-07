// Keep in sync with addtool/src/constants/addt.ts
// Keep in sync with addtool/webview/src/constants/addt.ts

export const ADDTOOL = {
  NAME: 'addtool',
  EXTENSION: 'addt',
  EDITOR: 'editor.addtool',
  LIB: 'addtoollib',
  EMPTY_FILE_CONTENT: {
    EXCALIDRAW: {"type": "addt" as const, "table": [] as Record<string, number>[], "umlComponent": {} as Record<string, string>, "drawer": {"type": "excalidraw" as const, "elements": [] as unknown[]}},
    // TODO
    DRAWIO: {"type": "addt" as const, "table": [] as Record<string, number>[], "umlComponent": {} as Record<string, string>, "drawer": {"type": "drawio" as const, "elements": [] as unknown[]}},
  },
}
