import User from '../domain/user';
import Id from '../domain/helpers/Id';

var USER_ID = new Id(1);

describe("user", () => {
	var user: User;

	beforeEach(() => {
		user = new User(USER_ID);
	});

	it("should exist", () => {
		expect(user instanceof User).toBeTruthy();
	});
});