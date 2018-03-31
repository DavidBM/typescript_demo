import Identificable from '@interfaces/identificable';
import Clonable from '@interfaces/clonable';
import Stated, {StatedInterface} from '@interfaces/stated'
import Id from '@helpers/Id';

/*
Here we did some dirty things.
Maybe first that is not good that the same file that creates the class User, applies a mixin.
Second, we applied the mixing in a weird way. It should be after the class with a "var StatedUser = Stated(User);"
Adding a extend is a hack for a problem in Typescript that is not able to infer some types. (That StatedUser wouldn't have a type)
    that would make impossible to use its definitions in a argument type definition, function return type definition, etc
More things, Stated should require the interface StatedInterface to be implemented. This would be true in the case we use the mixing in a normal way
    but then we lose the type. Doing it like this forces Stated to get a empty class that don't requires the StatedInterface
    making possible to create bugs without the type system telling you what is happening.

The correct way would be to create the file statedUser.ts and inside do:
export default class StatedUser extends Stated(User) {};
*/ 
export default class User extends Stated(class {}) implements Identificable, Clonable, StatedInterface {
	id: Id;

	constructor(id: Id) {
		super();
		this.id = id;
	}

	clone(): User {
		var user = new User(this.id.clone());
		return user;
	}

	isSame(user: User): boolean {
		return this.getId().isSame(user.getId());
	}

	getId(): Id {
		return this.id;
	}

	static fromUser(user: User): User {
		return user;
	}

	getClassMetadata() {
		return {
			name: User.name
		};
	}
};


//In case we apply the Mixin after the class creatin
//export default class StatedUser extends Stated(User) {};