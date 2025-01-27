import type { Radar } from "./types.js";

export function emptyRadar(): Radar {
	return {
		sections: [],
		rings: [],
		entries: [],
	};
}
