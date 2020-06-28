import { ControlStatement } from "./ControlStatements";
import { TreeItem } from "vscode";

export interface FlowTree {

}
export class FlowTree {
    linearStem: Array<FlowTree | ControlStatement>;

    constructor(linearStem?: Array<FlowTree | ControlStatement>) {
        this.linearStem = linearStem || [];
    }

    getHeight(): number {
        // Gets the max height from all composed trees
        let heights: Array<number> = this.linearStem.map(tree => tree.getHeight());
        return 1 + Math.max(...heights);
    }
    
}

export class Loop extends FlowTree {
    originalCode: String;
    condition: String;

    constructor(code: string, condition: string, action: FlowTree) {
        super();
        this.originalCode = code;
        this.condition = condition;
        this.linearStem.push(action);
    }


}

// export class WhileLoop extends Loop {
    
// }
