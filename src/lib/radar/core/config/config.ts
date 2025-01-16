import type { RadarConfig, RadarTheme } from "./types.js";

const defaultTheme = {
	colors: {
		grid: "#000",
		text: "#2280c3",
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
		entry: 40,
		strokeWidth: 1,
	},
} as const satisfies RadarTheme;

export const defaultConfig = {
	theme: defaultTheme,
	entryPlacement: "random",
	showLabels: true,
	interactive: true,
} satisfies RadarConfig;
