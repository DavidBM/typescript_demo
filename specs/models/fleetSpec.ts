
import Fleet from '../../src/domain/models/fleet';
import Id from '../../src/domain/helpers/Id';

describe("fleet", () => {
	var fleet: Fleet;
	var id: Id;

	beforeEach(() => {
		id = new Id("test");
		fleet = new Fleet(id);
	});

	it("should exist", () => {
		expect(fleet instanceof Fleet).toBeTruthy();
	});

	it("shouldn't jump is there isn't pass enough time for cooling", () => {
		fleet.setJumpTime(new Date((new Date()).getTime() - 55000));
		expect(fleet.canJump(new Date())).toBe(true);

		fleet.setJumpTime(new Date((new Date()).getTime() - 15000));
		expect(fleet.canJump(new Date())).toBe(false);
	});
});