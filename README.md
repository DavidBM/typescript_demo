# Demo of typescript with some demo logic

## Fleet movement
The map will be organized in a graph. The only way the player can move the fleets are through Jump Gates in the space. The gates are interconnected, forming a mesh connecting  the entire galaxy. 

To travel, the player’s fleets must jump from gate to gate until they reach the destination point. The fleets can’t move freely in the space. They always need a jump gate to move. 

- User story: The user can see the jump gates and their connections
- User story: User can have fleets (groups of ships) and these fleets can be in a jump gate
- User story: A player with fleets in a jump gate can see all the other player’s fleets
- User story: Fleets can use a jump gate and move to another interconnected gate
They can’t move to any gate, only the interconnected ones. 
- User story: Fleets can’t jump during 30 seconds after a jump

## Logic implementation

Here we implement only the domain. There is no http server or any way to communicate with the domain.

The main file is `domain/space.ts`. It implements the main logics. It should, provably, be split in two layers, one that keeps the data and give access to this data and other that implements the logic.

The other files, represent objects of our implementation. 

- `connection.ts` represents the connection of two Jump Gates.
- `fleet.ts` represents a fleets with the cooldown logic.
- `jumpGate.ts` is the jump gate. It keep track of the UserFleetsCollection in there and give operation for remove and add fleets.
- `userFleetCollection.ts` implements a collections of fleets from a user. It implements the IterableIterator too.
- `user.ts`represents a user

Right now this uses a mutable approach. I would like to be able to implement a immutable one. In any case, the required building blocks are there. All basic objects have the `isSame` method and have the responsibility of identify themselves. There is no comparation via reference. The only required core change would be to implement a `Set` object that uses the `isSame` for deduplication.  

I would like to test every function instead of only the main logic. I take note for the next time.

Test should be cleaned too.



