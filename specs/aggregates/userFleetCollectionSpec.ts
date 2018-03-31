import UserFleetCollection from '../../src/domain/aggregates/userFleetsCollection';
import User from '../../src/domain/models/user';
import Fleet from '../../src/domain/models/fleet';
import Id from '../../src/domain/helpers/Id';

var ID_1 = new Id(1);
var ID_2 = new Id(2);
var ID_3 = new Id(3);
var USER_ID = new Id("userId");

describe('jump gates', () => {
	var userFleets: UserFleetCollection;
	var user: User;

	beforeEach(() => {
		user = new User(USER_ID);
		userFleets = new UserFleetCollection(user);
	})

	it("should exist", () => {
		expect(userFleets instanceof UserFleetCollection).toBeTruthy();
	});

	it("should contain fleets", () => {
		var fleet = new Fleet(ID_1);
		var fleet2 = new Fleet(ID_2);

		userFleets.addFleet(fleet);

		expect(userFleets.countFleets()).toBe(1);
		userFleets.addFleet(fleet);
		expect(userFleets.countFleets()).toBe(1);
		userFleets.addFleet(fleet2);
		expect(userFleets.countFleets()).toBe(2);
	});

	it("should tell if it contains a fleet", () => {
		var fleetA = new Fleet(ID_1);
		var fleetB = new Fleet(ID_2);
		var otherUserFleet = new Fleet(ID_3);

		userFleets.addFleet(fleetA);
		userFleets.addFleet(fleetB);

		expect(userFleets.has(fleetA)).toBeTruthy();
		expect(userFleets.has(fleetB)).toBeTruthy();
		expect(userFleets.has(otherUserFleet)).not.toBeTruthy();
	});
});