import type { DeepKeyOf, ValueOf } from "./types.js";

export const deepMerge = <
	T extends Record<string, unknown>,
	K extends DeepKeyOf<T>,
	V extends ValueOf<T, K>,
>(
	initial: T,
	key: K,
	value: V,
): T => {
	const keys = key.split(".");
	const lastKey = keys.pop();
	if (!lastKey) {
		return { ...initial };
	}
	const target = keys.reduce(
		(obj, k) => obj[k] as Record<string, unknown>,
		initial as Record<string, unknown>,
	);
	target[lastKey] = value;
	return { ...initial };
};
