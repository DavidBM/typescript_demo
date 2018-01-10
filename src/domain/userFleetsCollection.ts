import User from './user';
import Fleet from './fleet';
import Collection from './helpers/Collection';
import Comparable from './interfaces/comparable';

export default class UserFleetsCollection implements Comparable, Iterable<Fleet> {
	user: User;
	fleets: Collection<Fleet>;

	constructor(user: User) {
		this.user = user;
		this.fleets = new Collection();
	}

	isSame(userFleet: UserFleetsCollection): boolean {
		var sameUser = userFleet.getUser().isSame(this.getUser());

		if(!sameUser) {
			return false; 
		}

		var containAllFleet = this.fleets.every((fleet) => userFleet.hasFleet(fleet));
		var sameQuantityOfFleets = this.fleets.size === userFleet.countFleets();

		return containAllFleet && sameQuantityOfFleets;
	}

	addFleet(fleet: Fleet): void {
		this.fleets.add(fleet);
	}

	getUser(): User {
		return User.fromUser(this.user);
	}

	isEmpty(): boolean {
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