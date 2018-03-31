import {JsonizableInterface, JsonizableType, Constructable} from '@interfaces/utils';

interface EntityMetadata extends JsonizableInterface {
	[key: string]: JsonizableInterface | JsonizableType,
	name: string
}

export interface StatedInterface {
	getClassMetadata(key: string, value: string | number): JsonizableType
};

export default function Stated<T extends Constructable, StatedInterface>(Base: T){
	return class extends Base{
		private _state: JsonizableInterface;

		constructor(...args: any[]){
			super(...args);
			this._state = {};
		}

		serialize(): string {
			return JSON.stringify(this._state);
		}

		deserialize(jsonStr: string): void {
			this._state = JSON.parse(jsonStr);
		}

		_getFullState(): JsonizableInterface {
			return this._state;
		}

		_setFullState(state: JsonizableInterface): void {
			this._state = Object.assign(this._state, state);
		}

		setState(key: string, value: string | number): void {
			this._state[key] = value;
		}
	}
}
