import type { Radar } from "./types.js";

export function initRadar(): Radar {
	return {
		rings: [],
		sections: [],
		entries: [],
	};
}
