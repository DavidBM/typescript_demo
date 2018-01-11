import JumpGate from './jumpGate';
import Connection, {SelfReferencedConnection} from './connection';
import UserFleet from './userFleetsCollection';
import Fleet from './fleet';
import User from './user';
import Collection from './helpers/Collection';

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

	findJumpGate(cb: (gate: JumpGate) => boolean): JumpGate | undefined {
		for (let gate of this.gates) {
			if(cb(gate))
				return gate;
		}
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

	getFleetGate(fleet: Fleet): JumpGate | Error {
		var fleetGate = Array.from(this.gates.values()).find(gate => gate.hasFleet(fleet));

		if(!fleetGate) {
			return new FleetNotInSpace();
		}

		return fleetGate;
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

export class FleetNotInSpace extends Error {
	constructor(message: string = '') {
		super();
		Error.captureStackTrace(this, FleetNotInSpace);
		this.message = "The fleet is not in the space you are using. " + message;
	}
};