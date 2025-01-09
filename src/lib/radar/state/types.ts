import type { RadarConfig } from "$lib/radar/core/config/types.js";
import type { Radar } from "$lib/radar/core/elements/radar.js";

export type AppState = {
	showWelcome: boolean;
	loading: boolean;
	errors: [code: number, context: Record<string, unknown>][];
	radar: Radar;
	radarConfig: RadarConfig;
};
