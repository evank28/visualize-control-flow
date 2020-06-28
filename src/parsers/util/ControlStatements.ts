export class ControlStatement {
    originalCode: string;

    constructor(code: string) {
        this.originalCode = code;
    }

}

export class Conditional extends ControlStatement{
    condition: string;
    ifAction: ControlStatement;
    elseAction: ControlStatement;

    constructor(code: string, condition: string, ifAction: ControlStatement, elseAction: ControlStatement) {
        super(code);
        this.condition = condition;
        this.ifAction = ifAction;
        this.elseAction = elseAction;
    }

}

export class Elif extends Conditional{
    subconditionals: Array<Conditional>;

    constructor(code: string, condition: string, ifAction: ControlStatement, elseAction: ControlStatement, subconditionals: Array<Conditional>) {
    super(code, condition, ifAction, elseAction);
       this.subconditionals = subconditionals;
    }
}

export class ExpressionBlock extends ControlStatement{

}
