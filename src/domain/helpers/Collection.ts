import ComparableInterface from '../interfaces/comparable';


export default class Collection <T extends ComparableInterface> extends Set {
	
	constructor(...items: Array<T>) {
		super(...items);
	}

	add(item: T): this {
		if(this.has(item))
			return this;

		return super.add(item);
	}

	get(itemToGet: T): T | undefined {
		for(let item of this){
			if(item.isSame(itemToGet)){
				return item;
			}
		}
	}

	has(itemToCompare: T): boolean {
		for(let item of this){
			if(item.isSame(itemToCompare)){
				return true;
			}
		}

		return false;
	}

	every(cb: (item: T) => boolean): boolean {
		for(let item of this) {
			if(!cb(item))
				return false;
		};

		return true;
	}

	find(cb: (item: T) => boolean): T | undefined {
		for(let item of this) {
			if(cb(item))
				return item;
		};

		return;
	}
}