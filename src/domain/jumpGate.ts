import IdentificableInterface from './interfaces/identificable';
import UserFleets from './userFleetsCollection';
import User from './user';
import Fleet from './fleet';
import Id from './helpers/Id';
import Collection from './helpers/Collection';

export default class JumpGate implements IdentificableInterface {
	userFleets: Collection<UserFleets>;
	id: Id;

	constructor(id: Id) {
		this.userFleets = new Collection();
		this.id = id;
	}

	isSame(gate: JumpGate): boolean {
		return this.getId() === gate.getId();
	}

	getId(): Id {
		return this.id;
	}

	addFleet(userFleets: UserFleets): void {
		var foundUserFleets = this.getUserFleets(userFleets.getUser());

		if(foundUserFleets) {
			for(let fleet of userFleets) {
				foundUserFleets.addFleet(fleet);
			}

			return;
		}

		this.userFleets.add(userFleets);
	}

	removeFleet(userFleets: UserFleets): void {
		var userFleetsOfGate = this.getUserFleets(userFleets.getUser());

		if(!userFleetsOfGate) {
			return;
		}

		for (let fleet of userFleets) {
			userFleetsOfGate.removeFleet(fleet);

			if(userFleetsOfGate.isEmpty()) {
				this.userFleets.delete(userFleetsOfGate);
			}
		}
	}

	getUserFleets(user: User): UserFleets | undefined {
		return this.userFleets.find((ownUserFleets) => user.isSame(ownUserFleets.getUser()));
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
		.some(userFleets => userFleets.isUser(user));

		if(!userFleets){
			return new NoFleetsOfUserInJumpGate();
		}

		return new Set(this.userFleets);
	}
};

export class NoFleetsOfUserInJumpGate extends Error {};