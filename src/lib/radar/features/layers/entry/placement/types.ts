import type { Entry, Section } from "$lib/radar/core/elements/types.js";
import type { Ring } from "~/types/radar.js";

export type DistributedPlacementOptions = {
	jitter?: number;
};

export type ClusteredPlacementOptions = {
	clustersCount?: number;
};

export type RandomPlacementOptions = Record<string, never>;

export type SpiralPlacementOptions = {
	spiralStep?: number;
};

export type PlacementOptions =
	| DistributedPlacementOptions
	| ClusteredPlacementOptions
	| RandomPlacementOptions
	| SpiralPlacementOptions;

export interface EntryPlacementContext {
	entry: Entry;
	section?: Section;
	ring?: Ring;
	startAngle: number;
	endAngle: number;
	minRadius: number;
	maxRadius: number;
}

export type Point = {
	x: number;
	y: number;
};
