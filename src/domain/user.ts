export default class User {
	isSame(user: User): boolean {
		return this === user;
	}

	static fromUser(user: User): User {
		return user;
	}
}