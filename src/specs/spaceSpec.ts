import Space from '../domain/space';
import Connection, { SelfReferencedConnection } from '../domain/connection';
import JumpGate from '../domain/jumpGate';

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
});