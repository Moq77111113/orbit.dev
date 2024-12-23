import type { Entry, Radar, Section } from '~/types/radar.js';

export type DistributedPlacementOptions = {
  jitter?: number;
};

export type ClusteredPlacementOptions = {
  clustersCount?: number;
};

export type RandomPlacementOptions = {};

export type SpiralPlacementOptions = {
  spiralStep?: number;
};

export type PlacementOptions =
  | DistributedPlacementOptions
  | ClusteredPlacementOptions
  | RandomPlacementOptions
  | SpiralPlacementOptions;

export interface PlacementContext {
  radar: Radar;
  entry: Entry;
  ringWidth: number;
  section?: Section;
  sectionIdx: number;
  ringIdx: number;
  startAngle: number;
  endAngle: number;
}

export type Point = {
  x: number;
  y: number;
};
