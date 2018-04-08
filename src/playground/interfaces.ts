export interface Constructable<T = {}>{
	new (...args: any[]): T
}

export type EventIdentifier<T> = (Constructable<T>);

export type JsonizableType = number | string | JsonizableInterface | Array<JsonizableInterface> | {toJSON: (arg: string) => string};

export interface JsonizableInterface {
	[key: string]: JsonizableType;
};

export interface Serializable {
	serialize(): JsonizableInterface
}
