import ComparableInterface from '../interfaces/comparable';

export default class Id implements ComparableInterface {

	id: string|number;

	constructor(id: string|number) {
		this.id = id;	
	}

	isSame(id: this): boolean {
		return id.compareRawId(this.getRawId());
	}

	getId(): this {
		return this;
	}

	getRawId(): string|number {
		return this.id;
	}

	compareRawId(idToCompare: string|number) {
		return idToCompare === this.id;
	}
}