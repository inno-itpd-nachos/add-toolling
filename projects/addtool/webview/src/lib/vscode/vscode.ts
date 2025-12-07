import {
  serializeAsJSON,
} from "@excalidraw/excalidraw"
import {vscodeMock} from './mock'
import type { FileContent, FileContentD, FileContentE } from "types/content"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const isVsCode = typeof acquireVsCodeApi !== 'undefined'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const vscode = isVsCode ? acquireVsCodeApi() : vscodeMock()

const textEncoder = new TextEncoder()

const json2VsCode = (
  content: FileContent
) => {
  if ('excalidraw' in content.drawer) {
    // TS не может сходить на уровень выше в content, но обновляет drawer
    return json2VSCodeExcalidraw(content as FileContentE)
  }

  return json2VSCodeDrawio(content as FileContentD)
}

const json2VSCodeExcalidraw = (
  content: FileContentE
) => {
  const {elements, appState, files} = content.drawer.excalidraw
  const excalidraw = serializeAsJSON(elements, appState, files || {}, "local")

  const json = JSON.stringify(content, (k, v) => k === 'excalidraw' ? '{{REPLACE}}' : v, 2)
  
  vscode.postMessage({
    type: "change",
    content: Array.from(
      textEncoder.encode(json.replace('"{{REPLACE}}"', excalidraw))
    ),
  })
}

const json2VSCodeDrawio = (_content: FileContentD) => {
  vscode.postMessage({
    type: 'error',
    message: 'Drawio is not implemented, but change is intended'
  })
}

export const sendChangesToVSCode = (contentType: string) => {
  if (contentType === "application/json") {
    return json2VsCode
  }
  throw new Error(`Unsupported content type: ${contentType}`)
}
