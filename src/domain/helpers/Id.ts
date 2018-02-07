import Comparable from '../interfaces/comparable';
import Clonable from '../interfaces/clonable';

export default class Id implements Comparable, Clonable {

	id: string|number;

	constructor(id: string|number) {
		this.id = id;	
	}

	clone(): Id {
		return new Id(this.id);
	}

	isSame(id: this): boolean {
		return id.compareRawId(this.getRawId());
	}

	getRawId(): string|number {
		return this.id;
	}

	compareRawId(idToCompare: string|number) {
		return idToCompare === this.id;
	}
}
