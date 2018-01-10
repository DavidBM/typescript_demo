import ComparableInterface from './interfaces/comparable';
import Id from './helpers/Id';

export default class User implements ComparableInterface{
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