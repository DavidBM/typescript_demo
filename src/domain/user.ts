import IdentificableInterface from './interfaces/identificable';
import Id from './helpers/Id';

export default class User implements IdentificableInterface{
	id: Id;

	constructor(id: Id) {
		this.id = id;
	}

	isSame(user: User): boolean {
		return this === user;
	}

	getId(): Id {
		return this.id;
	}

	static fromUser(user: User): User {
		return user;
	}
}