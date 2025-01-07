import type { AppState } from "~/lib/radar/state/types.js";
import { defaultConfig } from "../config/config.js";

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
