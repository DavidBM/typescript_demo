import JumpGate, {NoFleetsOfUserInJumpGate} from '../domain/jumpGate';
import UserFleetsCollection from '../domain/userFleetsCollection';
import Id from '../domain/helpers/Id';
import User from '../domain/user';
import Fleet from '../domain/fleet';

var JUMP_GATE_ID = new Id("jumpgate");
var ID = new Id(1);
var OTHER_ID = new Id(2);
var USER_ID_1 = new Id("user1");
var USER_ID_2 = new Id("user2");
var USER_ID_3 = new Id("user3");

describe('jump gates', () => {
	var gate: JumpGate;

	beforeEach(() => {
		gate = new JumpGate(JUMP_GATE_ID);
	})

	it("should exist", () => {
		expect(gate instanceof JumpGate).toBeTruthy();
	});

	it("should contain fleets", () => {
		var user = new User(USER_ID_1);
		var userFleet = new UserFleetsCollection(user);
		var fleet = new Fleet(ID);

		expect(gate.countFleets()).toBe(0);

		gate.addFleet(userFleet);

		expect(gate.countFleets()).toBe(0);

		userFleet.addFleet(fleet);

		expect(gate.countFleets()).toBe(1);
	});

	it("should return all fleets in the gate if the user has fleet there", () => {
		var userInGate = new User(USER_ID_1);
		var otherUser = new User(USER_ID_2);
		var userNotInGate = new User(USER_ID_3);
		var fleet = new Fleet(ID);
		var userFleet = new UserFleetsCollection(userInGate);
		var fleetOtherUser = new Fleet(OTHER_ID);
		var userFleetOtherUser = new UserFleetsCollection(otherUser);

		userFleet.addFleet(fleet);
		userFleetOtherUser.addFleet(fleetOtherUser);

		gate.addFleet(userFleet);
		gate.addFleet(userFleetOtherUser);

		expect(gate.getFleetsInUserView(userInGate)).toEqual(new Set([userFleet, userFleetOtherUser]));
		expect(gate.getFleetsInUserView(userNotInGate)).toEqual(new NoFleetsOfUserInJumpGate());
	});
});