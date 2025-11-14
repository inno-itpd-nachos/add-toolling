import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { ExcalidrawEditorProvider } from "./editor";
import { ExcalidrawUriHandler } from "./uri-handler";
import { TableEditorProvider } from "./table-editor";

export async function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(await ExcalidrawEditorProvider.register(context));
  context.subscriptions.push(ExcalidrawUriHandler.register());
  context.subscriptions.push(await TableEditorProvider.register(context));
  registerCommands(context);
}