import { ADDTOOL } from "constants"
import { Base64 } from "js-base64"

class VscodeMock {
  constructor() {}

  postMessage(arg: unknown) {
    console.log('[vscode mock] postMessage', arg)
  }
}

export function vscodeMock() {
  prepareMock()

  return new VscodeMock()
}

function setupConfig(root: Element) {
  root.setAttribute('data-addt-config', Base64.encode(JSON.stringify({
    content: ADDTOOL.EMPTY_FILE_CONTENT.EXCALIDRAW,
    contentType: 'application/json',
    library: undefined,
    viewModeEnabled: false,
    theme: 'dark',
    imageParams: {},
    langCode: 'en',
    name: 'mock',
  })))
}

function setupAssetPath() {
  window.EXCALIDRAW_ASSET_PATH = './'
}

function prepareMock() {
  const root = document.querySelector('#root')

  if (root) {
    setupConfig(root)
  }

  setupAssetPath()
}
