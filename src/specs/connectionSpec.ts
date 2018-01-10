import Connection from '../domain/connection';
import JumpGate from '../domain/jumpGate';
import Id from '../domain/helpers/Id';

var ID_1 = new Id(1);
var ID_2 = new Id(2);

describe("connections", () => {
	var connection: Connection;
	var gateA: JumpGate;
	var gateB: JumpGate;
	var id: Id;


	beforeEach(() => {
		gateA = new JumpGate(ID_1);
		gateB = new JumpGate(ID_2);
		id = new Id("test");

		connection = new Connection(id, gateA, gateB);
	});

	it('should contain JumpGates', () => {
		expect(connection.get()).toEqual([gateA, gateB]);
	})
});