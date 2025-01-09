export type DeepKeyOf<T> = T extends object
	? {
			[K in keyof T]: K extends string ? K | `${K}.${DeepKeyOf<T[K]>}` : never;
		}[keyof T]
	: never;

export type ValueOf<T, P extends string> = P extends keyof T
	? T[P]
	: P extends `${infer K}.${infer R}`
		? K extends keyof T
			? ValueOf<T[K], R>
			: never
		: never;
