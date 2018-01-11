import Space from '../domain/space';
import Navigation, { GatesNotConnected, FleetNotReadyToJump } from '../domain/navigation';
import Connection, { SelfReferencedConnection} from '../domain/connection';
import JumpGate from '../domain/jumpGate';
import User from '../domain/user';
import Fleet from '../domain/fleet';
import UserFleets from '../domain/userFleetsCollection';
import Id from '../domain/helpers/Id';

var ID_1 = new Id(1);
var ID_2 = new Id(2);
var ID_3 = new Id(3);
var ID_4 = new Id(4);
var ID_5 = new Id(5);
var USER_ID = new Id(6);

describe("navigation", () => {
	var space: Space;
	var navigation: Navigation;

	beforeEach(() => {
		space = new Space();
		navigation = new Navigation(space);
	});

	it("should exist", () => {
		expect(navigation instanceof Navigation).toBeTruthy();
	});

	it("should move a fleet to another jump gate", () => {
		var {gates, connections} = fillSpaceWith3Nodes(space);
		var {user, fleet, userFleets} = createUserFleets();

		gates[0].addFleet(userFleets);

		expect(gates[0].countFleets()).toBe(1);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(0);

		expect(navigation.jumpUserFleets(gates[1], joinUserAndFleet(user, fleet))).toEqual(new Set());

		expect(gates[0].countFleets()).toBe(0);
		expect(gates[1].countFleets()).toBe(1);
		expect(gates[2].countFleets()).toBe(0);

		expect(navigation.jumpUserFleets(gates[2], joinUserAndFleet(user, fleet))).toEqual(new Set());

		expect(gates[0].countFleets()).toBe(0);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(1);
	});

	it("should not move a fleet to a non connected gate", () => {
		var {gates, connections} = fillSpaceWith3Nodes(space);
		var {user, fleet, userFleets} = createUserFleets();

		var expectedResult: Set<[Fleet, Error]> = new Set();
		expectedResult.add([fleet, new GatesNotConnected()]);

		gates[0].addFleet(userFleets);

		expect(gates[0].countFleets()).toBe(1);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(0);

		expect(navigation.jumpUserFleets(gates[2], joinUserAndFleet(user, fleet))).toEqual(expectedResult);

		expect(gates[0].countFleets()).toBe(1);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(0);
	});

	it("should not move a fleet that just jump", () => {
		var JUMP_DELAY_MILISECONDS = 30 * 1000;

		var {gates, connections} = fillSpaceWith3Nodes(space);
		var {user, fleet, userFleets} = createUserFleets(JUMP_DELAY_MILISECONDS);

		var expectedResult: Set<[Fleet, Error]> = new Set();
		expectedResult.add([fleet, new FleetNotReadyToJump()]);

		gates[0].addFleet(userFleets);

		fleet.setJumpTime();

		expect(gates[0].countFleets()).toBe(1);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(0);

		expect(navigation.jumpUserFleets(gates[1], joinUserAndFleet(user, fleet))).toEqual(expectedResult);

		expect(gates[0].countFleets()).toBe(1);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(0);
	});
});

function fillSpaceWith3Nodes(space: Space): {gates: Array<JumpGate>, connections: Array<Connection>} {
	var gateA = new JumpGate(ID_1);
	var gateB = new JumpGate(ID_2);
	var gateC = new JumpGate(ID_3);

	var connectionAB = new Connection(ID_4, gateA, gateB);
	var connectionBC = new Connection(ID_5, gateB, gateC);

	space.addConnection(connectionAB);
	space.addConnection(connectionBC);

	space.addJumpGate(gateA);
	space.addJumpGate(gateB);
	space.addJumpGate(gateC);

	return {gates: [gateA, gateB, gateC], connections: [connectionAB, connectionBC]};
}

function createUserFleets(jumpDelay: number = 0): {user: User, fleet: Fleet, userFleets: UserFleets} {
		var user = new User(USER_ID);
		var fleet = new Fleet(ID_1, jumpDelay);
		var userFleets = new UserFleets(user);
		
		userFleets.addFleet(fleet);

		return {user, fleet, userFleets};
}

function joinUserAndFleet(user: User, fleet: Fleet): UserFleets {
	var userFleets = new UserFleets(user);
	userFleets.addFleet(fleet);
	return userFleets;
}