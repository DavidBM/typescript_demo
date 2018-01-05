import JumpGate from './jumpGate';
import Connection, {SelfReferencedConnection} from './connection';

export default class Space {
	gates: Set<JumpGate>;
	connections: Set<Connection>;

	constructor(){
		this.gates = new Set();
		this.connections = new Set();
	}

	addJumpGate(gate: JumpGate): void {
		this.gates.add(gate);
	}

	countJumpGates(): number {
		return this.gates.size;
	}

	addConnection(gate: Connection): void {
		this.connections.add(gate);
	}

	countConnections(): number {
		return this.connections.size;
	}

	getJumpGates(): Set<JumpGate> {
		return new Set(this.gates);
	}

	getConnectedJumpGates(gate: JumpGate): Set<JumpGate> {
		var connectedGates: Set<JumpGate> = new Set();

		var gates = Array.from(this.connections.values())
		.filter(connection => connection.hasJumpGate(gate))
		.forEach((connection) => {
			var otherGate = connection.getOtherJumpGate(gate);
			
			if(!(otherGate instanceof SelfReferencedConnection)) {
				connectedGates.add(otherGate);
			}
		});

		return connectedGates;
	}
}
