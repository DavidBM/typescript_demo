import UserFleets from './userFleetsCollection';
import User from './user';

export default class JumpGate {
	fleets: Set<UserFleets>;

	constructor() {
		this.fleets = new Set();
	}

	isSame(gate: JumpGate): boolean {
		return this === gate;
	}

	addFleet(fleet: UserFleets): void {
		this.fleets.add(fleet);
	}

	countFleets(): number {
		return this.fleets.size;
	}

	getFleetsInUserView(user: User): Set<UserFleets> | NoFleetsOfUserInJumpGate {
		var fleets = Array.from(this.fleets.values())
		.filter(userFleets => userFleets.isUser(user));

		if(fleets.length <= 0){
			return new NoFleetsOfUserInJumpGate();
		}

		return new Set(this.fleets);
	}
};

export class NoFleetsOfUserInJumpGate extends Error {};