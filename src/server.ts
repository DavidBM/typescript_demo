import Jumper from '@domain/jumper';
import Space from '@domain/space';
import Connection from '@domain/aggregates/connection';
import JumpGate from '@domain/aggregates/jumpGate';
import Id from '@domain/helpers/Id';
import UserFleetConnection from '@domain/aggregates/userFleetsCollection';
import User from '@domain/models/user';

var s = new Space();
var j = new Jumper(s); 

var jg = new JumpGate(new Id("1"));
var jg2 = new JumpGate(new Id("1"));
var c = new Connection(new Id(2), jg, jg2);

var ufc = new UserFleetConnection(new User(new Id(3)));

console.log("hola");