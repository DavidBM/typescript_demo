
import Fleet from '../../domain/models/fleet';
import Id from '../../domain/helpers/Id';

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
});