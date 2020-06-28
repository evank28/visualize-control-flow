import { FlowTree, CodeTree } from "../util/FlowTree";
import { countStartingSpaces } from "../util/Helpers";
import { ControlStatement, Conditional } from "../util/ControlStatements";

// TODO: Get the TAB_SIZE from the "Editor: Tab Size" from the VS Code API
const TAB_SIZE = 4 ;

// function parse(code: string): FlowTree {
//     let stemFlowTree = new FlowTree();
//     const lines: Array<string> = code.split("\n");

//     if (lines.length > 0) {

//         // Reads the number of spaces on the first line
//         // const baseIndent = lines[0].length - lines[0].trimLeft().length; 
//         const baseIndent =  countStartingSpaces(lines[0]);

//         // Tracks the indent hierarchy dynamically, without relying on a constant TAB_SIZE
//         // TODO: Change this to a Stack, since it is used like one (end of array = top of stack)
//         // Note: the first element is 0, so that the first row of the file is detected as an indent change
//         let indentChanges: Array<number> = [0];
//         let currentParent: FlowTree = stemFlowTree;
//         let currentStatement: FlowTree| undefined = undefined;
//         // currentParent.addSubTree(currentStatement)
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
    
// }

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
        // TODO: BUG -- assumes first line is not an empty string. Why can't this just be 0?
        const baseIndent =  countStartingSpaces(lines[0]); 

        // Tracks the indent hierarchy dynamically, without relying on a constant TAB_SIZE
        // TODO: Change this to a Stack, since it is used like one (end of array = top of stack)
        // Note: the first element is -1, so that the first row of the file is detected as an indent change
        var indentChanges: Array<number> = [-1];
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

console.log(parseCodeSimple(TEST));