import * as vscode from "vscode"
import { AddtEditor } from "./editor"

export class AddtUriHandler implements vscode.UriHandler {
  public static register() {
    const provider = new AddtUriHandler()
    const providerRegistration = vscode.window.registerUriHandler(provider)
    return providerRegistration
  }

  public async handleUri(uri: vscode.Uri) {
    const hash = new URLSearchParams(uri.fragment)
    const libraryUrl = hash.get("addLibrary")
    if (libraryUrl) {
      const res = await fetch(libraryUrl)
      const library = await res.text()
      AddtEditor.importLibrary(library)
    } else {
      vscode.window.showErrorMessage("Invalid URL!")
    }
  }
}