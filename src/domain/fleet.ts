var JUMP_DELAY_MILISECONDS = 30000;

export default class Fleet {
	lastJump: Date = new Date(0);
	jumpDelay: number = JUMP_DELAY_MILISECONDS;

	constructor(jumpDelay?: number) {
		if(typeof jumpDelay !== "undefined") this.jumpDelay = jumpDelay;
	}

	isSame(fleet: Fleet): boolean {
		return  this === fleet;
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