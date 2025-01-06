import type { RadarConfig, RadarTheme } from "~/types/theme.js";

export const defaultTheme = {
	colors: {
	
		grid: "#dedede",
		text: "#ff8000",
	},
	opacity: {
		rings: 0.7,
		text: 0.9,
		entries: 1,
	},
	fontSizes: {
		rings: 14,
		entries: 12,
	},
	sizes: {
		entry: 80,
		strokeWidth: 1,
	},
} as const satisfies RadarTheme;

export const defaultConfig = {
	theme: defaultTheme,
	entryPlacement: "random",
	showLabels: true,
	interactive: true,
} satisfies RadarConfig;
