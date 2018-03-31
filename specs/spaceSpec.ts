import Space from '../src/domain/space';
import Connection, { SelfReferencedConnection} from '../src/domain/aggregates/connection';
import JumpGate from '../src/domain/aggregates/jumpGate';
import User from '../src/domain/models/user';
import Fleet from '../src/domain/models/fleet';
import UserFleets from '../src/domain/aggregates/userFleetsCollection';
import Id from '../src/domain/helpers/Id';

var ID_1 = new Id(1);
var ID_2 = new Id(2);
var ID_3 = new Id(3);
var ID_4 = new Id(4);
var ID_5 = new Id(5);
var USER_ID = new Id(6);

describe("space", () => {
	var space: Space;

	beforeEach(() => {
		space = new Space();
	});

	it("should exist", () => {
		expect(space instanceof Space).toBeTruthy();
	});

	it("should contain JumpGates", () => {
		var gate = new JumpGate(ID_1);

		expect(space.countJumpGates()).toBe(0);

		space.addJumpGate(gate);

		expect(space.countJumpGates()).toBe(1);
	});

	it("should contain Connections", () => {
		var gateA = new JumpGate(ID_1);
		var gateB = new JumpGate(ID_2);
		var connection = new Connection(ID_3, gateA, gateB);

		expect(space.countConnections()).toBe(0);

		space.addConnection(connection);

		expect(space.countConnections()).toBe(1);
	});

	it("should return the gates in the space", () => {
		var gateA = new JumpGate(ID_1);
		var gateB = new JumpGate(ID_2);
		var gateC = new JumpGate(ID_3);
		space.addJumpGate(gateA);
		space.addJumpGate(gateB);

		var jumpGatesInSpace = space.getJumpGates();

		expect(jumpGatesInSpace.has(gateA)).toBeTruthy();
		expect(jumpGatesInSpace.has(gateB)).toBeTruthy();
		expect(jumpGatesInSpace.has(gateC)).not.toBeTruthy();
	});

	it("it can return the JumpGates connected to a JumpGate", () => {
		var gateA = new JumpGate(ID_1);
		var gateB = new JumpGate(ID_2);
		var gateC = new JumpGate(ID_3);

		var connectionAB = new Connection(ID_4, gateA, gateB);
		var connectionBC = new Connection(ID_5, gateB, gateC);

		space.addConnection(connectionAB);
		space.addConnection(connectionBC);

		var jumpGates = space.getConnectedJumpGates(gateB);

		expect(jumpGates.has(gateA)).toBeTruthy();
		expect(jumpGates.has(gateC)).toBeTruthy();
		expect(jumpGates.size).toBe(2);
	});
});