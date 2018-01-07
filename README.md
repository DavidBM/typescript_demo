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
