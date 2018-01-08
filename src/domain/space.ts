import JumpGate from './jumpGate';
import Connection, {SelfReferencedConnection} from './connection';
import UserFleet from './userFleetsCollection';
import Fleet from './fleet';
import User from './user';

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

	jumpUserFleets(gate: JumpGate, userFleetsToMove: UserFleet): Set<[Fleet, Error]> | GateNotInSpace {
		var destinationGate = Array.from(this.gates.values()).find(spaceGate => spaceGate.isSame(gate));

		if(!destinationGate) {
			return new GateNotInSpace();
		}

		var user = userFleetsToMove.getUser();
		var fleetsNotJumping = new Set();

		for (let fleet of userFleetsToMove) {
			var error = this._jumpFleet(fleet, destinationGate, user);

			if(error) {
				fleetsNotJumping.add([fleet, error]);
			}
		}

		return fleetsNotJumping;
	}

	_jumpFleet(fleet: Fleet, destinationGate: JumpGate, user: User): Error | undefined {
		if(!fleet.canJump()){
			return new FleetNotReadyToJump();
		}

		var originGate = this.getFleetGate(fleet);

		if(originGate instanceof Error){
			return originGate;
		}

		if(!this.areJumpGatesConnected(originGate, destinationGate)) {
			return new GatesNotConnected();
		}

		fleet.setJumpTime();

		var userFleetToMove = new UserFleet(user);
		userFleetToMove.addFleet(fleet);

		originGate.removeFleet(userFleetToMove);
		destinationGate.addFleet(userFleetToMove);	
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

export class GateNotInSpace extends Error {
	constructor(message: string = '') {
		super();
		Error.captureStackTrace(this, GateNotInSpace);
		this.message = "The gate is not in the space you are using. " + message;
	}
};

export class FleetNotInSpace extends Error {
	constructor(message: string = '') {
		super();
		Error.captureStackTrace(this, FleetNotInSpace);
		this.message = "The fleet is not in the space you are using. " + message;
	}
};

export class GatesNotConnected extends Error {
	constructor(message: string = '') {
		super();
		Error.captureStackTrace(this, GatesNotConnected);
		this.message = "The gate are not connected. " + message;
	}
};

export class FleetNotReadyToJump extends Error {
	constructor(message: string = '') {
		super();
		Error.captureStackTrace(this, FleetNotReadyToJump);
		this.message = "The fleet is not ready ro Jump. " + message;
	}
};