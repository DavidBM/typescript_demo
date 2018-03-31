import Comparable from '@interfaces/comparable';
import User from '@models/user';
import Fleet from '@models/fleet';
import Collection from '@helpers/Collection';

export default class UserFleetsCollection extends Collection<Fleet> implements Comparable{
	user: User;
	fleets: Collection<Fleet>;

	constructor(user: User) {
		super();
		this.user = user;
	}

	isSame(userFleet: UserFleetsCollection): boolean {
		var sameUser = userFleet.getUser().isSame(this.getUser());

		if(!sameUser) {
			return false; 
		}

		var containAllFleet = this.every((fleet) => userFleet.has(fleet));
		var sameQuantityOfFleets = this.size === userFleet.countFleets();

		return containAllFleet && sameQuantityOfFleets;
	}

	addFleet(fleet: Fleet): void {
		this.add(fleet);
	}

	getUser(): User {
		return User.fromUser(this.user);
	}

	isEmpty(): boolean {
		return this.size === 0;
	}

	removeFleet(fleet: Fleet): void {
		var foundFleets: Set<Fleet> = new Set();

		this.forEach(userFleet => {
			if(userFleet.isSame(fleet)){
				foundFleets.add(userFleet);
			}
		});

		foundFleets.forEach(fleet => this.delete(fleet));
	}

	countFleets(): number {
		return this.size;
	}

	iterateFleets(fn: (fleet: Fleet) => void): void {
		this.forEach(fn);
	}

	isUser(user: User): boolean {
		return this.user.isSame(user);
	}
}