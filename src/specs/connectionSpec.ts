import Connection from '../domain/connection';
import JumpGate from '../domain/jumpGate';

describe("connections", () => {
	var connection: Connection;

	it('should contain JumpGates', () => {
		var gateA = new JumpGate();
		var gateB = new JumpGate();

		var connection = new Connection(gateA, gateB);

		expect(connection.get()).toEqual([gateA, gateB]);
	})
});