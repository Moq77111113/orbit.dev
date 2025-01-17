import { createRandomRadar } from "./stubs.js";

import type { Radar } from "./types.js";

export function emptyRadar(): Radar {
	return {
		sections: [],
		rings: [],
		entries: [],
	};
}
export function initRadar(): Radar {
	return createRandomRadar();
}
