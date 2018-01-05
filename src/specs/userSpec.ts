import User from '../domain/user';

describe("user", () => {
	var user: User;

	beforeEach(() => {
		user = new User();
	});

	it("should exist", () => {
		expect(user instanceof User).toBeTruthy();
	});
});