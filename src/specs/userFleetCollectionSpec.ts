import UserFleetCollection from '../domain/userFleetsCollection';
import User from '../domain/user';
import Fleet from '../domain/fleet';

describe('jump gates', () => {
	var userFleets: UserFleetCollection;
	var user: User;

	beforeEach(() => {
		user = new User();
		userFleets = new UserFleetCollection(user);
	})

	it("should exist", () => {
		expect(userFleets instanceof UserFleetCollection).toBeTruthy();
	});

	it("should contain fleets", () => {
		var fleet = new Fleet();
		var fleet2 = new Fleet();

		userFleets.addFleet(fleet);

		expect(userFleets.countFleets()).toBe(1);
		userFleets.addFleet(fleet);
		expect(userFleets.countFleets()).toBe(1);
		userFleets.addFleet(fleet2);
		expect(userFleets.countFleets()).toBe(2);
	});

	it("should tell if a fleet is owned by a user", () => {
		var fleetA = new Fleet();
		var fleetB = new Fleet();
		var otherUserFleet = new Fleet();

		userFleets.addFleet(fleetA);
		userFleets.addFleet(fleetB);

		expect(userFleets.isUserFleet(fleetA)).toBeTruthy();
		expect(userFleets.isUserFleet(fleetB)).toBeTruthy();
		expect(userFleets.isUserFleet(otherUserFleet)).not.toBeTruthy();
	});
});