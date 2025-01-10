import { createRandomRadar } from "./stubs.js";

import type { Radar } from "./types.js";

export function initRadar(): Radar {
	return createRandomRadar();
}
