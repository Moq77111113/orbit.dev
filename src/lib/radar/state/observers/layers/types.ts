import type { RadarConfig } from "~/lib/radar/config/types.js";

export type Dimensions = {
	width: number;
	height: number;
	radius: number;
};

export type Context = {
	dimensions: Dimensions;
	config: RadarConfig;
};
