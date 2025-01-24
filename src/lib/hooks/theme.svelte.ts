import { getContext, setContext } from "svelte";
import { z } from "zod";

const noopStorage = {
	getItem: (_key: string) => null,

	setItem: (_key: string, _value: string) => {},

	removeItem: (_key: string) => {},
};

const isBrowser = typeof window !== "undefined";

const schema = z.union([
	z.literal("system"),
	z.literal("light"),
	z.literal("dark"),
]);

export type ThemeValue = z.infer<typeof schema>;

class Theme {
	#storage = isBrowser ? window.localStorage : noopStorage;

	#value = $state<ThemeValue>("system");
	constructor(protected readonly key = "orb.theme") {
		const storedValue = this.#storage.getItem(this.key);

		this.change(storedValue || "system");
	}

	get values() {
		return ["system", "light", "dark"] as const;
	}

	change(value: string) {
		const isValueValid = schema.safeParse(value);

		if (!isValueValid.success) {
			this.#clear();
			return;
		}

		this.#value = isValueValid.data;
		this.#storage.setItem(this.key, this.#value);
		this.#dispatch();
	}

	#clear() {
		this.#value = "system";
		this.#storage.removeItem(this.key);
		this.#dispatch();
	}

	#dispatch() {
		document.documentElement.classList.remove("light", "dark");
		if (this.#value !== "system") {
			document.documentElement.classList.add(this.#value);
		}
	}

	get value() {
		return this.#value;
	}
}

const key = "orb-theme";

export const createTheme = () => {
	return setContext(Symbol.for(key), new Theme());
};

export const useTheme = () => {
	return getContext<Theme>(Symbol.for(key));
};
