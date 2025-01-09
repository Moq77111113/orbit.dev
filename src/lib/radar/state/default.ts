import { defaultConfig } from "$lib/radar/core/config/config.js";
import type { AppState } from "$lib/radar/state/types.js";

export const getDefaultState = (): Omit<AppState, "radar"> => {
	return {
		showWelcome: false,
		loading: false,
		errors: [],
		radarConfig: {
			...defaultConfig,
		},
	};
};
