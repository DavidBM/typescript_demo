import Space from './space';
import JumpGate from './jumpGate';
import Fleet from './fleet';
import User from './user';
import UserFleet from './userFleetsCollection';

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
				this.eventBus.emit(new FleetStartJump(fleetSnapshot, fleet));
			}*/
		}

		return fleetsNotJumping;
	}

	_jumpFleet(fleet: Fleet, destinationGate: JumpGate, user: User): Error | undefined {
		if(!fleet.canJump()){
			return new FleetNotReadyToJump();
		}

		var originGate = this.space.getFleetGate(fleet);

		if(originGate instanceof Error){
			return originGate;
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
		Error.captureStackTrace(this, GateNotInSpace);
		this.message = "The gate is not in the space you are using. " + message;
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