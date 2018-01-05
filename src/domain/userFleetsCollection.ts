import User from './user';
import Fleet from './fleet';

export default class UserFleetsCollection {
	user: User;
	fleets: Set<Fleet>;

	constructor(user: User) {
		this.user = user;
		this.fleets = new Set();
	}

	addFleet(fleet: Fleet): void {
		this.fleets.add(fleet);
	}

	countFleets(): Number {
		return this.fleets.size;
	}

	isUserFleet(fleet: Fleet): boolean {
		var isOwned = false;		

		return Array.from(this.fleets.values())
		.some(ownFleet => ownFleet.isSame(fleet));
	}

	isUser(user: User): boolean {
		return this.user.isSame(user);
	}
}