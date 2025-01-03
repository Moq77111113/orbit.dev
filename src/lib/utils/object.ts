export const entries = <K extends string, V>(object: Record<K, V>): [K, V][] =>
	Object.entries(object) as [K, V][];

export const keys = <K extends string, V>(object: Record<K, V>): K[] =>
	Object.keys(object) as K[];
