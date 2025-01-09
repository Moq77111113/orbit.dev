export type RadarTheme = {
	colors: {
		grid: string;
		text: string;
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
};

export type RadarEntryPlacement =
	| "random"
	| "distributed"
	| "clustered"
	| "spiral";

export type RadarConfig = {
	theme: RadarTheme;
	entryPlacement: RadarEntryPlacement;
	showLabels: boolean;
	interactive: boolean;
};
