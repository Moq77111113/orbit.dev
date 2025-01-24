import type { RadarConfig } from "$lib/radar/core/config/types.js";
import type { Radar } from "$lib/radar/core/elements/types.js";

export type AppMode = "read" | "read-write";
export type AppState = {
	vector: SVGElement | null;
	radar: Radar;
	radarConfig: RadarConfig;
	mode: AppMode;
};
