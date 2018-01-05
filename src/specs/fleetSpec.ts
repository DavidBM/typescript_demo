import Fleet from '../domain/fleet';

describe("fleet", () => {
	var fleet: Fleet;

	beforeEach(() => {
		fleet = new Fleet();
	});

	it("should exist", () => {
		expect(fleet instanceof Fleet).toBeTruthy();
	});
});