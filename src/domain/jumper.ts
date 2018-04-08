import Space from '@domain/space';
import JumpGate from '@domain/aggregates/jumpGate';
import Fleet from '@domain/models/fleet';
import User from '@domain/models/user';
import UserFleet from '@domain/aggregates/userFleetsCollection';

export default class Navigation {
	space: Space;

	constructor(space: Space) {
		this.space = space;
	}

	jumpUserFleets(gate: JumpGate, userFleetsToMove: UserFleet): Set<[Fleet, Error]> | GateNotInSpace {
		var destinationGate = this.space.findGate(gate);

		if(!destinationGate) {
			return new GateNotInSpace();
		}

		var user = userFleetsToMove.getUser();
		var fleetsNotJumping = new Set();

		for (let fleet of userFleetsToMove) {
			//var fleetSnapshot = fleet.clone();
			var error = this._jumpFleet(fleet, destinationGate, user);

			if(error) {
				fleetsNotJumping.add([fleet, error]);
			}/*else{
				this.eventBus.emit(new FleetStartJump(fleetSnapshot, fleet, destinationGate, user));
			}*/
		}

		return fleetsNotJumping;
	}

	_jumpFleet(fleet: Fleet, destinationGate: JumpGate, user: User): Error | undefined {
		if(!fleet.canJump()){
			return new FleetNotReadyToJump();
		}

		var originGate = this.space.getFleetGate(fleet);

		if(!originGate){
			return new FleetNotInSpace();
		}

		if(!this.space.areJumpGatesConnected(originGate, destinationGate)) {
			return new GatesNotConnected();
		}

		fleet.setJumpTime();

		var userFleetToMove = new UserFleet(user);
		userFleetToMove.addFleet(fleet);

		originGate.removeFleet(userFleetToMove);
		destinationGate.addFleet(userFleetToMove);
	}
}

export class GateNotInSpace extends Error {
	constructor(message: string = '') {
		super();
		this.stack = (new Error()).stack;
		this.message = "The gate is not in the space you are using. " + message;
	}
};

export class GatesNotConnected extends Error {
	constructor(message: string = '') {
		super();
		this.stack = (new Error()).stack;
		this.message = "The gate are not connected. " + message;
	}
};

export class FleetNotReadyToJump extends Error {
	constructor(message: string = '') {
		super();
		this.stack = (new Error()).stack;
		this.message = "The fleet is not ready ro Jump. " + message;
	}
};

export class FleetNotInSpace extends Error {
	constructor(message: string = '') {
		super();
		this.stack = (new Error()).stack;
		this.message = "The fleet is not in the space you are using. " + message;
	}
};