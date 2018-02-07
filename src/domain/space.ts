import JumpGate from './aggregates/jumpGate';
import Connection, {SelfReferencedConnection} from './aggregates/connection';
import UserFleet from './aggregates/userFleetsCollection';
import Fleet from './models/fleet';
import User from './models/user';
import Collection from './helpers/Collection';

//A repository of JumpGates and Connections
export default class Space {
	gates: Collection<JumpGate>;
	connections: Collection<Connection>;

	constructor(){
		this.gates = new Collection();
		this.connections = new Collection();
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

	findGate(gate: JumpGate): JumpGate | undefined {
		return this.gates.get(gate);
	}

	getJumpGates(): Collection<JumpGate> {
		return this.gates;
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

	getFleetGate(fleet: Fleet): JumpGate | undefined {
		return this.gates.find((gate) => gate.hasFleet(fleet));
	}

	areJumpGatesConnected(gateA: JumpGate, gateB: JumpGate): boolean {
		return Array.from(this.connections.values()).some(connection => {
			if(connection.hasJumpGate(gateA) && connection.hasJumpGate(gateB)) {
				return true;
			}

			return false;
		});
	}
}
