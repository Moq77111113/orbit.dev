import type { AppState } from "~/types/app.js";
import { defaultConfig } from "./config.js";

export const getDefaultState = (): Omit<AppState, "radar" | "target"> => {
	return {
		showWelcome: false,
		loading: false,
		errors: [],
		radarConfig: {
			...defaultConfig,
		},
	};
};
