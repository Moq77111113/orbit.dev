export type Pretty<T> = {
	[P in keyof T]: T[P];
};
export type Merge<T, U> = Omit<T, Extract<keyof T, keyof U>> & U;

type Pop<T extends unknown[]> = T extends [...infer U, unknown] ? U : never;
type Shift<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never;

export type Tail<
	T extends unknown[],
	N extends number = T["length"],
> = T["length"] extends N ? T : Tail<Shift<T>, N>;

export type Head<
	T extends unknown[],
	N extends number = T["length"],
> = T["length"] extends N ? T : Head<Pop<T>, N>;

export type Creatable<T extends { id: string }> = Omit<T, "id">;
