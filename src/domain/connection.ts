import JumpGate from './jumpGate';

export default class Connection {
	gateA: JumpGate;
	gateB: JumpGate;

	constructor(gateA: JumpGate, gateB: JumpGate) {
		this.gateA = gateA;
		this.gateB = gateB;
	};

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
