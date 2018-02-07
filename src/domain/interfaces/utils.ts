export type Constructable<T = {}> = new (...args: any[]) => T;

export type JsonizableType = number | string | JsonizableInterface | Array<JsonizableInterface>;

export interface JsonizableInterface {
	[key: string]: JsonizableType;
};
