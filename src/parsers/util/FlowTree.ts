import { ControlStatement } from "./ControlStatements";

export interface FlowTree {

}
export class FlowTree {
    linearStem: Array<FlowTree | ControlStatement>;

    constructor() {
        this.linearStem = [];
    }
    
}

export class Loop extends FlowTree {
    originalCode: String;
    condition: String;

    constructor(code: string, condition: string, action: FlowTree) {
        super()
        this.originalCode = code;
        this.condition = condition;
        this.linearStem.push(action);
    }


}

export class WhileLoop extends Loop {
    
}
