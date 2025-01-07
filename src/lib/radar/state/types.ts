import type { RadarConfig } from "$lib/radar/config/types.js";
import type { Radar } from "$lib/radar/elements/types/radar.js";

export type AppState = {
	showWelcome: boolean;
	loading: boolean;
	errors: [code: number, context: Record<string, unknown>][];
	radar: Radar;
	radarConfig: RadarConfig;
};
