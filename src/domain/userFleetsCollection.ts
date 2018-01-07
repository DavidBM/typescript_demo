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

	getUser(): User {
		return User.fromUser(this.user);
	}

	isEmpty() {
		return this.fleets.size === 0;
	}

	removeFleet(fleet: Fleet): void {
		var foundFleets: Set<Fleet> = new Set();

		this.fleets.forEach(userFleet => {
			if(userFleet.isSame(fleet)){
				foundFleets.add(userFleet);
			}
		});

		foundFleets.forEach(fleet => this.fleets.delete(fleet));
	}

	countFleets(): number {
		return this.fleets.size;
	}

	iterateFleets(fn: (fleet: Fleet) => void): void {
		this.fleets.forEach(fn);
	}

	[Symbol.iterator](): IterableIterator<Fleet> { 
		return this.fleets.values(); 
	}

	hasFleet(fleet: Fleet): boolean {
		return Array.from(this.fleets.values())
		.some(ownFleet => ownFleet.isSame(fleet));
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