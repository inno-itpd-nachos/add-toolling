import * as vscode from "vscode"
import { ADDTOOL } from "src/constants"
import { newUntitledAddtDocument } from "./utils"
import { AddtEditor } from "./editor"

function getConfigurationScope(
  config: vscode.WorkspaceConfiguration,
  key: string
) {
  const inspect = config.inspect(key)
  if (inspect?.workspaceFolderValue) {
    return vscode.ConfigurationTarget.WorkspaceFolder
  }
  if (inspect?.workspaceValue) {
    return vscode.ConfigurationTarget.Workspace
  }
  return vscode.ConfigurationTarget.Global
}

async function updateTheme() {
  const addtConfig = vscode.workspace.getConfiguration(ADDTOOL.NAME)
  const initialTheme = addtConfig.get<string>("theme")
  // Todo: find out the scope of the current theme config before updating it
  const configurationScope = getConfigurationScope(addtConfig, "theme")
  const updateThemeConfig = (variant: string | undefined) => {
    addtConfig.update("theme", variant, configurationScope)
  }

  const quickPick = vscode.window.createQuickPick()
  const items = [
    {
      label: "light",
      description: "Always use light theme",
    },
    {
      label: "dark",
      description: "Always use dark theme",
    },
    {
      label: "auto",
      description: "Sync theme with VSCode",
    },
  ]
  quickPick.items = items
  quickPick.activeItems = items.filter((item) => item.label === initialTheme)

  quickPick.onDidChangeActive((actives) => {
    if (actives.length > 0) {
      updateThemeConfig(actives[0].label)
    }
  })

  let confirm = false
  quickPick.onDidAccept(() => {
    confirm = true
    const actives = quickPick.activeItems
    if (actives.length > 0) {
      updateThemeConfig(actives[0].label)
    } else {
      updateThemeConfig(initialTheme)
    }
    quickPick.hide()
  })
  quickPick.onDidHide(() => {
    if (!confirm) {
      updateThemeConfig(initialTheme)
    }
  })

  quickPick.show()
}

function showSource(uri: vscode.Uri, viewColumn?: vscode.ViewColumn) {
  vscode.window.showTextDocument(uri, { viewColumn })
}

export async function showEditor(
  uri: vscode.Uri,
  viewColumn?: vscode.ViewColumn
) {
  await vscode.commands.executeCommand(
    "vscode.openWith",
    uri,
    ADDTOOL.EDITOR,
    viewColumn
  )
}

// function showImage(uri: vscode.Uri, viewColumn?: vscode.ViewColumn) {
//   vscode.commands.executeCommand(
//     "vscode.openWith",
//     uri,
//     "imagePreview.previewEditor",
//     viewColumn
//   )
// }

async function newFile() {
  try {
    await newUntitledAddtDocument()
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create new file: ${error}`)
  }
}

/**
 * Example command that sends a message to all active webviews.
 * You can use this as a template for your own commands.
 */
// function exampleSendMessageToWebview() {
//   sendMessageToWebviews({
//     type: "command-triggered",
//     action: "example-action",
//     timestamp: Date.now(),
//   })
//   vscode.window.showInformationMessage("Message sent to webviews")
// }

export function registerCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.newFile`, newFile)
  )
  // context.subscriptions.push(
  //   vscode.commands.registerCommand(`${ADDTOOL.NAME}.newSceneFile`, newFile)
  // )
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.updateTheme`, updateTheme)
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.showSource`, showSource)
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.showEditor`, showEditor)
  )
  // context.subscriptions.push(
  //   vscode.commands.registerCommand(`${ADDTOOL.NAME}.showImage`, showImage)
  // )
  // context.subscriptions.push(
  //   vscode.commands.registerCommand(`${ADDTOOL.NAME}.showImageToSide`, (uri) =>
  //     showImage(uri, vscode.ViewColumn.Beside)
  //   )
  // )
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.showEditorToSide`, (uri) =>
      showEditor(uri, vscode.ViewColumn.Beside)
    )
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.showSourceToSide`, (uri) =>
      showSource(uri, vscode.ViewColumn.Beside)
    )
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.preventDefault`, () => {})
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(`${ADDTOOL.NAME}.toggleView`, () =>
      sendMessageToWebviews({type: 'command', name: 'toggleView'})
    )
  )
  // Example: Register a command that sends a message to webviews
  // Uncomment to enable:
  // context.subscriptions.push(
  //   vscode.commands.registerCommand(
  //     `${ADDTOOL.NAME}.exampleSendMessage`,
  //     exampleSendMessageToWebview
  //   )
  // )
}

/**
 * Helper function to send a message from a command to all active webviews.
 * @param message The message object to send (must have a 'type' property)
 * @example
 * sendMessageToWebviews({ type: 'custom-action', data: 'some data' })
 */
export function sendMessageToWebviews(message: {
  type: string
  [key: string]: unknown
}) {
  AddtEditor.postMessageToAllWebviews(message)
}