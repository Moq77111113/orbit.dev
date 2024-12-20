export type RadarTheme = {
	colors: {
		ring: string;
		grid: string;
		text: string;
		background?: string;
	};
	opacity: {
		rings: number;
		text: number;
		entries: number;
	};
	fontSizes: {
		rings: number;
		entries: number;
	};
	sizes: {
		entry: number;
		strokeWidth: number;
	};
	spacing: {
		labelPadding: number;
	};
};

export type RadarConfig = {
	theme: RadarTheme;
	entryPlacement: "random" | "distributed" | "clustered" | "spiral";
	showLabels: boolean;
	interactive: boolean;
	animationDuration: number;
};
