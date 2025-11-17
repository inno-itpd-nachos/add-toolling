import * as vscode from "vscode"
import { registerCommands } from "extension/commands"
import { AddtEditorProvider } from "extension/editor"
import { AddtUriHandler } from "extension/uri-handler"

export async function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(await AddtEditorProvider.register(context))
  context.subscriptions.push(AddtUriHandler.register())
  registerCommands(context)
}
