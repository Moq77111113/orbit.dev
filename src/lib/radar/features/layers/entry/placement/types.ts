import type { Entry, Ring, Section } from "$lib/radar/core/elements/types.js";

export type DistributedPlacementOptions = {
	jitter?: number;
};

export type ClusteredPlacementOptions = {
	clustersCount?: number;
	spread?: number;
};

export type RandomPlacementOptions = Record<string, never>;

export type SpiralPlacementOptions = {
	spiralStep?: number;
	jitter?: number;
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
	rate: number;
}

export type Point = {
	x: number;
	y: number;
};
