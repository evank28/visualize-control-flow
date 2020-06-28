import { FlowTree } from "./FlowTree";

export class ControlStatement {
    originalCode: string;

    constructor(code: string) {
        this.originalCode = code;
    }

    getHeight(): number {
        return 1;
    }

    getWidth(): number {
        return 1;
    }

}

export class Conditional extends ControlStatement{
    condition: string;
    ifAction: FlowTree;
    elseAction: FlowTree | undefined;

    constructor(code: string, condition: string, ifAction: FlowTree, elseAction?: FlowTree) {
        super(code);
        this.condition = condition;
        this.ifAction = ifAction;
        this.elseAction = elseAction;
    }

    getHeight(): number {
        if (this.elseAction) {
            return 1 + Math.max(this.ifAction.getHeight(), this.elseAction?.getHeight());
        }
        else {
            return 1 + this.ifAction.getHeight();
        }
            
    }

    getWidth(): number {
        if (this.elseAction) {
            return this.ifAction.getWidth() +  this.elseAction?.getWidth();
        }
        else {
            return this.ifAction.getWidth();
        }
            
    }

}

export class Elif extends Conditional{
    subconditionals: Array<Conditional>;

    // TODO: Implement getHeight for subconditions
    // TODO: Implement getWidth for subconditions

    constructor(code: string, condition: string, ifAction: FlowTree, elseAction: FlowTree, subconditionals: Array<Conditional>) {
    super(code, condition, ifAction, elseAction);
       this.subconditionals = subconditionals;
    }
}

export class ExpressionBlock extends ControlStatement{

}
