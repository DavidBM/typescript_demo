import JumpGate, {NoFleetsOfUserInJumpGate} from '../domain/jumpGate';
import UserFleetsCollection from '../domain/userFleetsCollection';
import User from '../domain/user';
import Fleet from '../domain/fleet';

describe('jump gates', () => {
	var gate: JumpGate;

	beforeEach(() => {
		gate = new JumpGate();
	})

	it("should exist", () => {
		expect(gate instanceof JumpGate).toBeTruthy();
	});

	it("should contain fleets", () => {
		var user = new User();
		var fleet = new UserFleetsCollection(user);

		expect(gate.countFleets()).toBe(0);

		gate.addFleet(fleet);

		expect(gate.countFleets()).toBe(1);
	});

	it("should return all fleets in the gate if the user has fleet there", () => {
		var userInGate = new User();
		var userNotInGate = new User();
		var fleet = new Fleet();
		var userFleet = new UserFleetsCollection(userInGate);

		gate.addFleet(userFleet);

		expect(gate.getFleetsInUserView(userInGate)).toEqual(new Set([userFleet]));
		expect(gate.getFleetsInUserView(userNotInGate)).toEqual(new NoFleetsOfUserInJumpGate());
	});
});