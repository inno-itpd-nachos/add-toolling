import * as vscode from "vscode";
import { TableDocument } from "./table-document";

export class TableEditorProvider
  implements vscode.CustomEditorProvider<TableDocument>
{
  public static async register(
    context: vscode.ExtensionContext
  ): Promise<vscode.Disposable> {
    const provider = new TableEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      TableEditorProvider.viewType,
      provider,
      {
        supportsMultipleEditorsPerDocument: false,
        webviewOptions: { retainContextWhenHidden: true },
      }
    );

    return providerRegistration;
  }

  private static readonly viewType = "editor.addtable";

  constructor(private readonly context: vscode.ExtensionContext) {}

  public async resolveCustomEditor(
    document: TableDocument,
    webviewPanel: vscode.WebviewPanel
  ) {
    const editor = new TableEditor(document, webviewPanel.webview, this.context);
    const editorDisposable = await editor.setupWebview();

    webviewPanel.onDidDispose(() => {
      editorDisposable.dispose();
    });
  }

  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<
    vscode.CustomDocumentContentChangeEvent<TableDocument>
  >();
  public readonly onDidChangeCustomDocument =
    this._onDidChangeCustomDocument.event;

  async backupCustomDocument(
    document: TableDocument,
    context: vscode.CustomDocumentBackupContext
  ): Promise<vscode.CustomDocumentBackup> {
    return document.backup(context.destination);
  }

  async openCustomDocument(
    uri: vscode.Uri,
    openContext: vscode.CustomDocumentOpenContext
  ): Promise<TableDocument> {
    let content: Uint8Array;
    if (uri.scheme === "untitled") {
      // Default empty table structure
      content = new TextEncoder().encode(
        JSON.stringify({ columns: [], rows: [] }, null, 2)
      );
    } else {
      content = await vscode.workspace.fs.readFile(
        openContext.backupId ? vscode.Uri.parse(openContext.backupId) : uri
      );
    }
    const document = new TableDocument(uri, content);

    const onDidDocumentChange = document.onDidContentChange(() => {
      this._onDidChangeCustomDocument.fire({ document });
    });

    document.onDidDispose(() => {
      onDidDocumentChange.dispose();
    });

    return document;
  }

  revertCustomDocument(document: TableDocument): Thenable<void> {
    return document.revert();
  }

  saveCustomDocument(document: TableDocument): Thenable<void> {
    return document.save();
  }

  async saveCustomDocumentAs(
    document: TableDocument,
    destination: vscode.Uri
  ) {
    await document.saveAs(destination);
  }
}

export class TableEditor {
  private textDecoder = new TextDecoder();
  private textEncoder = new TextEncoder();

  constructor(
    readonly document: TableDocument,
    readonly webview: vscode.Webview,
    readonly context: vscode.ExtensionContext
  ) {}

  public async setupWebview() {
    this.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    const onDidReceiveMessage = this.webview.onDidReceiveMessage(
      async (msg) => {
        switch (msg.type) {
          case "change":
            try {
              const jsonString = JSON.stringify(msg.data, null, 2);
              const content = this.textEncoder.encode(jsonString);
              await this.document.update(content);
            } catch (error) {
              vscode.window.showErrorMessage(
                `Failed to update document: ${error}`
              );
            }
            break;
          case "error":
            vscode.window.showErrorMessage(msg.content);
            break;
        }
      },
      this
    );

    // Initial content
    this.webview.html = this.getHtmlForWebview();

    // Update webview when document changes
    const onDidChangeDocument = this.document.onDidContentChange(() => {
      this.updateWebview();
    });

    return new vscode.Disposable(() => {
      onDidReceiveMessage.dispose();
      onDidChangeDocument.dispose();
    });
  }

  private updateWebview() {
    try {
      const jsonString = this.textDecoder.decode(this.document.content);
      const data = JSON.parse(jsonString);
      this.webview.postMessage({
        type: "update",
        data: data,
      });
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to parse document: ${error}`);
    }
  }

  private getHtmlForWebview(): string {
    let jsonString: string;
    let tableData: any;

    try {
      jsonString = this.textDecoder.decode(this.document.content);
      tableData = JSON.parse(jsonString);
    } catch (error) {
      // If parsing fails, use default structure
      tableData = { columns: [], rows: [] };
      jsonString = JSON.stringify(tableData, null, 2);
    }

    // Normalize data structure - support both array of objects and {columns, rows} format
    let columns: string[] = [];
    let rows: any[] = [];

    if (Array.isArray(tableData)) {
      // Array of objects format
      if (tableData.length > 0) {
        columns = Object.keys(tableData[0]);
        rows = tableData;
      }
    } else if (tableData.columns && tableData.rows) {
      // {columns, rows} format
      columns = tableData.columns;
      rows = tableData.rows;
    } else if (typeof tableData === "object" && tableData !== null) {
      // Single object - treat keys as columns
      columns = Object.keys(tableData);
      rows = [tableData];
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table Editor</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
        }
        .toolbar {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
            align-items: center;
        }
        button {
            padding: 6px 12px;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 2px;
            cursor: pointer;
            font-size: 13px;
        }
        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .table-container {
            overflow-x: auto;
            border: 1px solid var(--vscode-panel-border);
            border-radius: 4px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 600px;
        }
        th, td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        th {
            background-color: var(--vscode-editor-lineHighlightBackground);
            font-weight: 600;
            position: sticky;
            top: 0;
            z-index: 1;
        }
        tr:hover {
            background-color: var(--vscode-list-hoverBackground);
        }
        input, textarea {
            width: 100%;
            padding: 4px 8px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 2px;
            font-family: var(--vscode-font-family);
            font-size: 13px;
        }
        input:focus, textarea:focus {
            outline: 1px solid var(--vscode-focusBorder);
            outline-offset: -1px;
        }
        .add-column-input {
            display: inline-block;
            width: 200px;
            margin-right: 10px;
        }
        .cell-actions {
            display: flex;
            gap: 4px;
        }
        .delete-btn {
            background-color: var(--vscode-inputValidation-errorBackground);
            color: var(--vscode-errorForeground);
            padding: 2px 6px;
            font-size: 11px;
        }
        .delete-btn:hover {
            background-color: var(--vscode-inputValidation-errorBorder);
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <input type="text" id="newColumnName" class="add-column-input" placeholder="New column name">
        <button onclick="addColumn()">Add Column</button>
        <button onclick="addRow()">Add Row</button>
    </div>
    <div class="table-container">
        <table id="dataTable">
            <thead id="tableHead"></thead>
            <tbody id="tableBody"></tbody>
        </table>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let columns = ${JSON.stringify(columns)};
        let rows = ${JSON.stringify(rows)};

        function renderTable() {
            const thead = document.getElementById('tableHead');
            const tbody = document.getElementById('tableBody');
            
            // Render header
            thead.innerHTML = '';
            const headerRow = document.createElement('tr');
            columns.forEach((col, colIndex) => {
                const th = document.createElement('th');
                th.innerHTML = \`
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>\${escapeHtml(col)}</span>
                        <button class="delete-btn" onclick="deleteColumn(\${colIndex})" title="Delete column">×</button>
                    </div>
                \`;
                headerRow.appendChild(th);
            });
            // Add empty header for row actions
            const actionsHeader = document.createElement('th');
            actionsHeader.textContent = '';
            headerRow.appendChild(actionsHeader);
            thead.appendChild(headerRow);

            // Render body
            tbody.innerHTML = '';
            rows.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                columns.forEach((col) => {
                    const td = document.createElement('td');
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = row[col] !== undefined ? String(row[col]) : '';
                    input.oninput = () => updateCell(rowIndex, col, input.value);
                    td.appendChild(input);
                    tr.appendChild(td);
                });
                // Add delete row button
                const actionsTd = document.createElement('td');
                actionsTd.className = 'cell-actions';
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteRow(rowIndex);
                actionsTd.appendChild(deleteBtn);
                tr.appendChild(actionsTd);
                tbody.appendChild(tr);
            });
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function addColumn() {
            const input = document.getElementById('newColumnName');
            const name = input.value.trim();
            if (name && !columns.includes(name)) {
                columns.push(name);
                // Add the column to all existing rows
                rows.forEach(row => {
                    if (!(name in row)) {
                        row[name] = '';
                    }
                });
                input.value = '';
                renderTable();
                notifyChange();
            }
        }

        function deleteColumn(colIndex) {
            const colName = columns[colIndex];
            columns.splice(colIndex, 1);
            rows.forEach(row => {
                delete row[colName];
            });
            renderTable();
            notifyChange();
        }

        function addRow() {
            const newRow = {};
            columns.forEach(col => {
                newRow[col] = '';
            });
            rows.push(newRow);
            renderTable();
            notifyChange();
        }

        function deleteRow(rowIndex) {
            rows.splice(rowIndex, 1);
            renderTable();
            notifyChange();
        }

        function updateCell(rowIndex, col, value) {
            if (rows[rowIndex]) {
                rows[rowIndex][col] = value;
                notifyChange();
            }
        }

        function notifyChange() {
            // Convert to array of objects format for JSON
            const data = rows.map(row => {
                const obj = {};
                columns.forEach(col => {
                    obj[col] = row[col] || '';
                });
                return obj;
            });
            vscode.postMessage({
                type: 'change',
                data: data
            });
        }

        // Handle Enter key in column name input
        document.getElementById('newColumnName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addColumn();
            }
        });

        // Listen for updates from extension
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'update') {
                const data = message.data;
                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        columns = Object.keys(data[0]);
                        rows = data;
                    } else {
                        columns = [];
                        rows = [];
                    }
                } else if (data.columns && data.rows) {
                    columns = data.columns;
                    rows = data.rows;
                }
                renderTable();
            }
        });

        // Initial render
        renderTable();
    </script>
</body>
</html>`;
  }
}

