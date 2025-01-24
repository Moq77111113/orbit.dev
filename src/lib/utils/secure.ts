export const secureOnly = <T, Args extends unknown[]>(
	fn: (...args: Args) => T,
	ifInsecure?: () => void,
) => {
	if (typeof window === 'undefined' || window?.location.protocol !== "https:") {
		ifInsecure?.();
		return undefined;
	}

	return fn;
};
