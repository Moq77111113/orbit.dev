import type { RadarConfig } from "$lib/radar/core/config/types.js";
import type { Radar } from "$lib/radar/core/elements/types.js";

export type AppState = {
	showWelcome: boolean;
	vector: SVGElement | null;
	loading: boolean;
	errors: [code: number, context: Record<string, unknown>][];
	radar: Radar;
	radarConfig: RadarConfig;
};
