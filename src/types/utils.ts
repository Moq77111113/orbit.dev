export type Pretty<T> = {
	[P in keyof T]: T[P];
};
export type Merge<T, U> = Pretty<Omit<T, Extract<keyof T, keyof U>> & U>;
