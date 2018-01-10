import ComparableInterface from './interfaces/comparable';
import JumpGate from './jumpGate';
import Id from './helpers/Id';

export default class Connection implements ComparableInterface {
	id: Id;
	gateA: JumpGate;
	gateB: JumpGate;

	constructor(id: Id, gateA: JumpGate, gateB: JumpGate) {
		this.gateA = gateA;
		this.gateB = gateB;
		this.id = id;
	};

	isSame(item: Connection): boolean {
		return this === item;
	}

	getId() {
		return this.id;
	}

	get(): Array<JumpGate> {
		return [this.gateA, this.gateB];
	}

	hasJumpGate(gate: JumpGate): boolean {
		return this.gateA.isSame(gate) || this.gateB.isSame(gate);
	}

	getOtherJumpGate(gate: JumpGate): JumpGate | SelfReferencedConnection {
		if(this.gateA.isSame(gate) && this.gateB.isSame(gate))
			return new SelfReferencedConnection();

		if(this.gateA.isSame(gate)){
			return this.gateB;
		}else{
			return this.gateA;
		}
	}
};

export class SelfReferencedConnection extends Error {};
