// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { generateDiagramAsHTML } from "./html-generator/GenerateDiagram";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "visualize-control-flow" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "visualize-control-flow.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World from Visualize Control Flow!');
    }
  );

  let visualizeOpenFile = vscode.commands.registerCommand(
    "visualize-control-flow.visualizeOpenFile",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "Control Flow Diagram",
        "Control Flow Diagram: python_demo2.py",
        vscode.ViewColumn.One,
        {}
      );

      // panel.webview.html = `<p>HelloWorld</p>`;
      panel.webview.html = `<img src='https://i.imgur.com/v5uLUCd.png' width="500"/>`;
      
      // panel.webview.html = generateDiagramAsHTML();
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(visualizeOpenFile);
}

// this method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('Sorry to see you go!');
}
