import type { RadarConfig, RadarTheme } from "./types.js";

const defaultTheme = {
	colors: {
		grid: "#1f1f1f",
		text: "#1f1f1f",
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
		entry: 150,
		strokeWidth: 1,
	},
} as const satisfies RadarTheme;

export const defaultConfig = {
	theme: defaultTheme,
	entryPlacement: "random",
	showLabels: true,
	interactive: true,
} satisfies RadarConfig;
