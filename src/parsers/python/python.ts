import { FlowTree, CodeTree } from "../util/FlowTree";
import { countStartingSpaces } from "../util/Helpers";
import { Expression, ControlStatement, Conditional, ActionPart } from "../util/ControlStatements";
//  Get the TAB_SIZE from the "Editor: Tab Size" from the VS Code API -- NOT IN USE
// const TAB_SIZE = 4 ;

export function parse(code: string): FlowTree {
    let stemFlowTree = new FlowTree();
    let codeTree = parseCodeSimple(code);
    // POSTORDER TRAVERSAL through children, adding each child tree
    if (codeTree.getHeight() > 0) {
        while (codeTree.children.length !== 0){
            const child = codeTree.children.shift();
            // @ts-ignore - Just checked that it has children
            const convertedChild = postorderParseHelper(child);
            stemFlowTree.addSubTree(convertedChild);
        }
    }
    return stemFlowTree;
}

function postorderParseHelper(codeTree: CodeTree): FlowTree{
    // IF IT HAS NO CHILDREN, RETURN AN EXPRESSION FOR IT:
    if (codeTree.children.length === 0){
        const expr = new Expression(codeTree.lineString.trim());
        return expr;
    }
     // IF IT HAS CHILDREN
    else {
        // CHECK what type of special tree it is:
        // const trimmedLine = codeTree.lineString.trim();
        // const keyword = trimmedLine.substr(0, trimmedLine.indexOf(" ") + 1);
        const keyword = codeTree.keyword();
        switch(keyword){
            case "if":
                // Look at the if contents
                let ifAction = new ActionPart(keyword);
                for (const child of codeTree.children){
                    ifAction.addSubTree(postorderParseHelper(child));
                }
                // Create IF-ELSE block statement
                    // get condition (no if, no semicolon)
                    const trimmedLine = codeTree.lineString.trim();
                    const condition = trimmedLine.substr(keyword.length+1, trimmedLine.length - 1); 

                let flowTree = new Conditional(codeTree.lineString, condition, ifAction);
                
                // Look at the else contents, if these is an else -- by advancing to the next line
                let elseChild = codeTree.parent?.peekNextChild();
                if (elseChild && elseChild.keyword() === "else"){
                    //  @ts-ignore
                    let convertedChild = postorderParseHelper(codeTree.parent.children.shift());
                    flowTree.addSubTree(convertedChild);
                }
                return flowTree;
            case "else":
                // Create a special action block that holds all the children of the else block
                let action = new ActionPart(keyword);
                for (const child of codeTree.children){
                    action.addSubTree(postorderParseHelper(child));
                }
                return action;
            default:
                throw Error("Not a recognized keyword.");
        }
    }
                            
    
//                     }
    //     // Traverse Children Recursively
    //     let flowTree = new FlowTree();
    //     while (codeTree.children.length > 0) {
    //         // Pop the first child
    //        const child = codeTree.children.shift();
    //         // @ts-ignore -- `child` will neessarily not be undefined, since we checked the child length in loop condition
    //        const convertedChild = postorderParseHelper(child);
    //        flowTree.addSubTree(convertedChild)

    //     }
    //     root = new FlowTree();
    //     root.addSubTree(root);
    //     flowTree.insertRoot()
    //     // Add root


    // }
  
    // return flowTree

}
    // Read parent node

//     if (lines.length > 0) {
//         lines ++

//         // Reads the number of spaces on the first line
//         // const baseIndent = lines[0].length - lines[0].trimLeft().length; 
//         // const baseIndent =  countStartingSpaces(lines[0]);

//         // Tracks the indent hierarchy dynamically, without relying on a constant TAB_SIZE
//         // TODO: Change this to a Stack, since it is used like one (end of array = top of stack)
//         // Note: the first element is 0, so that the first row of the file is detected as an indent change
//         let indentChanges: Array<number> = [0];
//         let currentParent: FlowTree = stemFlowTree;
//         let currentStatement: FlowTree| undefined = undefined;
//         // currentParent.addSubTree(currentStatement)

//         // Traverse down a branch
 
//         while 



//         for (let i = 0; i < lines.length; i++) {
//             const line = lines[i]
//             const indent = countStartingSpaces(line);
//             // If the indent has not changed
//             if (countStartingSpaces(line) === indentChanges[-1]){
//                 // @ts-ignore Adds the line to the current expression, must be an expression block
//                 currentStatement.addLine(line)
//             }
//             else if (indent === -1){
//                 // Skips empty/space only lines where indents change
//                 continue;
//             }
//             else {
//                 const increasedIndent = indent >= indentChanges[-1];
//                 // Case: if (indent <= indentChanges[-1])
//                 if (!increasedIndent) {
//                     // Remove the last indent from the indentChanges tracking Array
//                     indentChanges.pop();
//                     currentStatement = currentStatement.parent;

//                     // TODO: Append the current accumulated FlowTree
//                 } 
//                 else { 
//                     // Update the indentChanges tracking Array
//                     indentChanges.push(indent);
//                     // Start a new folow tree for the new level
//                     //   TODO: depends on the keyword
//                       let subtree = new FlowTree();
//                       currentParent.addSubTree(subtree);
//                       currentParent = subtree
//                     //   currentStatement = subtree;
//                     //   
//                     //   if (currentParent != stemFlowTree){
//                     //         currentParent = currentStatement

//                     //   }
                
                
//                 // ds the curren statement to the subtree 
//                     if (currentStatement) stemFlowTree.addSubTree(currentStatement)
    
//                     const keyword = line.substr(indent, line.indexOf(" ", indent));
//                     switch(keyword){
//                         case "if":
//                         currentStatement = 1;
//                         default:

                            
    
//                     }
                    
                
//                     // Append the current accumulated FlowTree
//                     // Start a new one
            

//                 if (increasedIndent) {
//                     // Update the indentChanges tracking Array
//                     indentChanges.push(indent);
//                 } 
               
//             }
       

//         }

        
//     }
// }

//     return stemFlowTree;
    


// function translateKeyword(word: string): ControlStatement | FlowTree {
//     switch(keyword){
//         case "if":
//           return Conditional()
//         default:
// }

function parseCodeSimple(code: string): CodeTree {
    let stem = new CodeTree({line: "ROOT"});
    const lines: Array<string> = code.split("\n");
    if (lines.length > 0) {
        // Reads the number of spaces on the first line
        // const baseIndent = lines[0].length - lines[0].trimLeft().length; 
        // DISABLED: assumes first line is not an empty string. Why can't this just be 0?
        // const baseIndent =  countStartingSpaces(lines[0]); 

        // Tracks the indent hierarchy dynamically, without relying on a constant TAB_SIZE
        // TODO: Change this to a Stack, since it is used like one (end of array = top of stack)
        // Note: the first element is 0, so that the first row of the file is detected as an indent change
        var indentChanges: Array<number> = [0];
        var currentParent: CodeTree = stem;
            
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const indent = countStartingSpaces(line);
            
            if (indent === -1){
                // Skips empty/space ALWAYS
                continue;
            }
            // If the indent has not changed 
            else if (countStartingSpaces(line) === indentChanges[indentChanges.length-1]){
                //  Adds the line to the current expression, must be an expression block
                currentParent.addSubTree(
                    new CodeTree({line: line, parent: currentParent})
                );
            }
            else {
                const increasedIndent = indent >= indentChanges[indentChanges.length-1];
                // Inreased indent
                if (increasedIndent){
                    currentParent = currentParent.children[currentParent.children.length-1];
                    currentParent.addSubTree(
                        new CodeTree({line: line, parent: currentParent})
                    );
                    // Update the indentChanges tracking Array
                    indentChanges.push(indent);
                }
                // Decreased indent
                else {
                    // @ts-ignore
                    currentParent = currentParent.parent;
                    currentParent.addSubTree(
                        new CodeTree({line: line, parent: currentParent})
                    );
                    // Remove the last indent from the indentChanges tracking Array
                    indentChanges.pop();

                }
            }
        }
        
    }
    return stem;
}


const TEST = `
print("Hello World")

x = randint(0,1)

if x:
    print("True")

else:
    print("False")`;

// const codeTree = parseCodeSimple(TEST);  
// console.log(codeTree.toString(0));

const flowTree = parse(TEST);
console.log(flowTree);