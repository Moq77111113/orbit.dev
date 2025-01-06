import type { RadarConfig } from "./config.js";
import type { Radar } from "./radar.js";

export type AppState = {
	showWelcome: boolean;
	loading: boolean;
	errors: [code: number, context: Record<string, unknown>][];
	radar: Radar;
	radarConfig: RadarConfig;
	target: SVGElement | null;
};
