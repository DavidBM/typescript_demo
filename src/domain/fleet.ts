import ComparableInterface from './interfaces/comparable';
import Id from './helpers/Id'

var JUMP_DELAY_MILISECONDS = 30000;

export default class Fleet implements ComparableInterface{
	lastJump: Date = new Date(0);
	id: Id;
	jumpDelay: number = JUMP_DELAY_MILISECONDS;

	constructor(id: Id, jumpDelay?: number) {
		if(typeof jumpDelay !== "undefined") this.jumpDelay = jumpDelay;
		this.id = id;
	}

	isSame(fleet: Fleet): boolean {
		return  this.id.isSame(fleet.getId());
	}

	getId(): Id {
		return this.id;
	}

	setJumpTime(date?: Date) {
		if(!date) date = new Date();

		this.lastJump = date;
	}

	canJump(now?: Date): boolean {
		if(!now) now = new Date();

		if(now.getTime() - this.lastJump.getTime() >= this.jumpDelay){
			return true;
		}

		return false;
	}
}