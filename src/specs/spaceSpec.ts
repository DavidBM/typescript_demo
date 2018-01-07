import Space, { GatesNotConnected, FleetNotReadyToJump } from '../domain/space';
import Connection, { SelfReferencedConnection} from '../domain/connection';
import JumpGate from '../domain/jumpGate';
import User from '../domain/user';
import Fleet from '../domain/fleet';
import UserFleets from '../domain/userFleetsCollection';

describe("space", () => {
	var space: Space;

	beforeEach(() => {
		space = new Space();
	});

	it("should exist", () => {
		expect(space instanceof Space).toBeTruthy();
	});

	it("should contain JumpGates", () => {
		var gate = new JumpGate();

		expect(space.countJumpGates()).toBe(0);

		space.addJumpGate(gate);

		expect(space.countJumpGates()).toBe(1);
	});

	it("should contain Connections", () => {
		var gateA = new JumpGate();
		var gateB = new JumpGate();
		var connection = new Connection(gateA, gateB);

		expect(space.countConnections()).toBe(0);

		space.addConnection(connection);

		expect(space.countConnections()).toBe(1);
	});

	it("should return the gates in the space", () => {
		var gateA = new JumpGate();
		var gateB = new JumpGate();
		var gateC = new JumpGate();
		space.addJumpGate(gateA);
		space.addJumpGate(gateB);

		var jumpGatesInSpace = space.getJumpGates();

		expect(jumpGatesInSpace.has(gateA)).toBeTruthy();
		expect(jumpGatesInSpace.has(gateB)).toBeTruthy();
		expect(jumpGatesInSpace.has(gateC)).not.toBeTruthy();
	});

	it("it can return the JumpGates connected to a JumpGate", () => {
		var gateA = new JumpGate();
		var gateB = new JumpGate();
		var gateC = new JumpGate();

		var connectionAB = new Connection(gateA, gateB);
		var connectionBC = new Connection(gateB, gateC);

		space.addConnection(connectionAB);
		space.addConnection(connectionBC);

		var jumpGates = space.getConnectedJumpGates(gateB);

		expect(jumpGates.has(gateA)).toBeTruthy();
		expect(jumpGates.has(gateC)).toBeTruthy();
		expect(jumpGates.size).toBe(2);
	});

	it("should move a fleet to another jump gate", () => {
		var {gates, connections} = fillSpaceWith3Nodes(space);
		var {user, fleet, userFleets} = createUserFleets();

		gates[0].addFleet(userFleets);

		expect(gates[0].countFleets()).toBe(1);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(0);

		expect(space.jumpUserFleets(gates[1], joinUserAndFleet(user, fleet))).toEqual(new Set());

		expect(gates[0].countFleets()).toBe(0);
		expect(gates[1].countFleets()).toBe(1);
		expect(gates[2].countFleets()).toBe(0);

		expect(space.jumpUserFleets(gates[2], joinUserAndFleet(user, fleet))).toEqual(new Set());

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

		expect(space.jumpUserFleets(gates[2], joinUserAndFleet(user, fleet))).toEqual(expectedResult);

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

		expect(space.jumpUserFleets(gates[1], joinUserAndFleet(user, fleet))).toEqual(expectedResult);

		expect(gates[0].countFleets()).toBe(1);
		expect(gates[1].countFleets()).toBe(0);
		expect(gates[2].countFleets()).toBe(0);
	});
});

function fillSpaceWith3Nodes(space: Space): {gates: Array<JumpGate>, connections: Array<Connection>} {
	var gateA = new JumpGate();
	var gateB = new JumpGate();
	var gateC = new JumpGate();

	var connectionAB = new Connection(gateA, gateB);
	var connectionBC = new Connection(gateB, gateC);

	space.addConnection(connectionAB);
	space.addConnection(connectionBC);

	space.addJumpGate(gateA);
	space.addJumpGate(gateB);
	space.addJumpGate(gateC);

	return {gates: [gateA, gateB, gateC], connections: [connectionAB, connectionBC]};
}

function createUserFleets(jumpDelay: number = 0): {user: User, fleet: Fleet, userFleets: UserFleets} {
		var user = new User();
		var fleet = new Fleet(jumpDelay);
		var userFleets = new UserFleets(user);
		
		userFleets.addFleet(fleet);

		return {user, fleet, userFleets};
}

function joinUserAndFleet(user: User, fleet: Fleet): UserFleets {
	var userFleets = new UserFleets(user);
	userFleets.addFleet(fleet);
	return userFleets;
}