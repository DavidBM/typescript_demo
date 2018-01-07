import UserFleets from './userFleetsCollection';
import User from './user';
import Fleet from './fleet';

export default class JumpGate {
	userFleets: Set<UserFleets>;

	constructor() {
		this.userFleets = new Set();
	}

	isSame(gate: JumpGate): boolean {
		return this === gate;
	}

	addFleet(userFleets: UserFleets): void {
		this.userFleets.add(userFleets);
	}

	removeFleet(userFleets: UserFleets): void {
		var userFleetsOfGate = this.getUserFleets(userFleets.getUser());

		userFleetsOfGate.forEach(userFleetOfGate => {
			userFleets.iterateFleets(fleet => {
				userFleetOfGate.removeFleet(fleet);

				if(userFleetOfGate.isEmpty()) {
					this.userFleets.delete(userFleetOfGate);
				}
			})
		});
	}

	getUserFleets(user: User): Set<UserFleets> {
		var userFleets = Array.from(this.userFleets.values())
		.filter(userFleets => userFleets.isUser(user));

		return new Set(userFleets);
	}

	countFleets(): number {
		var total = 0;
		this.userFleets.forEach(userFleet => total += userFleet.countFleets());
		return total;
	}

	countUserFleets(): number {
		return this.userFleets.size;
	}

	hasFleet(fleet: Fleet): boolean {
		return Array.from(this.userFleets.values()).some(userFleets => userFleets.hasFleet(fleet));
	}

	getFleetsInUserView(user: User): Set<UserFleets> | NoFleetsOfUserInJumpGate {
		var userFleets = Array.from(this.userFleets.values())
		.filter(userFleets => userFleets.isUser(user));

		if(userFleets.length <= 0){
			return new NoFleetsOfUserInJumpGate();
		}

		return new Set(this.userFleets);
	}
};

export class NoFleetsOfUserInJumpGate extends Error {};