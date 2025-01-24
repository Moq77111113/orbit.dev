import { getContext, setContext } from "svelte";

const noopStorage = {
	getItem: (_key: string) => null,

	setItem: (_key: string, _value: string) => {},

	removeItem: (_key: string) => {},
};

const isBrowser = typeof window !== "undefined";

const rgb = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
const hsl = /^hsl\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)$/;
const rgba = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
const hsla = /^hsla\((\d{1,3}),(\d{1,3})%,(\d{1,3})%,(\d{1,3})\)$/;
const hex = /^#[0-9a-f]{6}$/i;
const named =
	/^(transparent|black|white|gray|red|green|blue|yellow|purple|orange|pink)$/;
function isColor(color: string) {
	return (
		rgb.test(color) ||
		hsl.test(color) ||
		rgba.test(color) ||
		hsla.test(color) ||
		hex.test(color) ||
		named.test(color)
	);
}
class SvgBackground {
	#storage = isBrowser ? window.localStorage : noopStorage;

	#value = $state<string>("transparent");
	constructor(protected readonly key = "orb.svg-bg") {
		const storedValue = this.#storage.getItem(this.key);


		this.change(storedValue || "transparent");
	}

	change(value: string) {
		if (!isColor(value)) {
			this.#clear();
			return;
		}
		this.#storage.setItem(this.key, value);
		this.#value = value;
	}

	#clear() {
		this.#value = "transparent";
		this.#storage.removeItem(this.key);
	}

	get value() {
		return this.#value;
	}
}

const key = "orb-rdr-bg";

export const createBackgroundStore = () => {
	return setContext(Symbol.for(key), new SvgBackground());
};

export const useSvgBackground = () => {
	return getContext<SvgBackground>(Symbol.for(key));
};
