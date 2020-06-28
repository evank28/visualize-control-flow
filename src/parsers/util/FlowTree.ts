import { ControlStatement } from "./ControlStatements";

export interface FlowTree {

}
export class FlowTree {
    linearStem: Array<FlowTree | ControlStatement>;
    parent: FlowTree | undefined;

    constructor(linearStem?: Array<FlowTree | ControlStatement>, parent?: FlowTree) {
        this.linearStem = linearStem || [];
        this.parent = parent || undefined;
    }

    getHeight(): number {
        // Gets the max height from all composed trees/ControlStatement
        let heights: Array<number> = this.linearStem.map(tree => tree.getHeight());
        return 1 + Math.max(...heights);
    }

    getWidth(): number {
        // Gets the sum of the widths of all composed trees/ControlStatements
        let widths: Array<number> = this.linearStem.map(tree => tree.getWidth());
        return widths.reduce((prev, cur) => prev + cur);
    }

    addSubTree(subTree: FlowTree): void {
        this.linearStem.push(subTree);
        subTree.setParent(this);
    }

    setParent(parent: FlowTree): void {
        this.parent = parent;
    }
    
}

// export class Loop extends FlowTree {
//     originalCode: String;
//     condition: String;

//     constructor(code: string, condition: string, action: FlowTree) {
//         super();
//         this.originalCode = code;
//         this.condition = condition;
//         this.linearStem.push(action);
//     }
// }

// export class WhileLoop extends Loop {
    
// }

export class CodeTree{
    // Tree class. Root has undefined parent. Leafs have empty list children. Line value is the code on the line.
    lineString: string;
    parent: CodeTree | undefined;
    children: Array<CodeTree>;

    constructor(params: CodeNode){
        this.lineString = params.line;
        this.parent = params.parent || undefined;
        this.children = params.children || [];
    }

    addSubTree(subTree: CodeTree): void {
        this.children.push(subTree);
        subTree.setParent(this);
    }

    setParent(parent: CodeTree): void {
        this.parent = parent;
    }
    

}

export interface CodeNode{
    line: string;
    parent?: CodeTree | undefined;
    children?: Array<CodeTree>
}