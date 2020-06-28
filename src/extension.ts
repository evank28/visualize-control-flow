// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from "path";
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "visualize-control-flow" is now active!'
  );
  // console.log(createRectange());

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "visualize-control-flow.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      // vscode.window.showInformationMessage(
      //   "Hello World from Visualize Control Flow!"
      // );
      const panel = vscode.window.createWebviewPanel(
        "UMLView",
        "UML View",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          // localResourceRoots: [
          //   vscode.Uri.file(path.join(context.extensionPath)),
          // ],
        }
      );

      panel.webview.html = `<p>HelloWorld</p>`;
    }
  );
  const scriptPathOnDisk = vscode.Uri.file(
    path.join(context.extensionPath, "src", "generateSVG.js")
  );

  const scriptPathOnDisk2 = vscode.Uri.file(
    path.join(context.extensionPath, "src", "svg.js")
  );

  let openWebView = vscode.commands.registerCommand(
    "visualize-control-flow.openWebView",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "UMLView",
        "UML View",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "src")),
          ],
        }
      );

      const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
      const scriptUri2 = panel.webview.asWebviewUri(scriptPathOnDisk2);

      panel.webview.html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>SVG Playground</title>

                    <meta charset="UTF-8">
                <!--
                Use a content security policy to only allow loading images from https or from our extension directory,
                and only allow scripts that have a specific nonce.
                -->
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${panel.webview.cspSource} https:; script-src ${panel.webview.cspSource} 'nonce-1';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>
    <h1>Color Playground</h1>

    <p>
      Lets test the different types of random colors we can make
    </p>

    <svg viewBox="0 0 1500 1500" id="canvas"></svg>
  </body>

  <script nonce="2" src="${scriptUri2}" charset="utf-8"></script>
  <script nonce="1" src="${scriptUri}" charset="utf-8"></script>
</html>

`;
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(openWebView);
}

// this method is called when your extension is deactivated
export function deactivate() {}
