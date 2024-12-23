import type { Entry, Radar, Section } from '~/types/radar.js';
type Point = {
  x: number;
  y: number;
};

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

export abstract class PlacementStrategy<
  TStrategy extends PlacementOptions = PlacementOptions
> {
  protected options: TStrategy;

  constructor(options: TStrategy = {} as TStrategy) {
    this.options = options;
  }

  protected getContext(
    radar: Radar,
    entry: Entry,
    ringWidth: number
  ): PlacementContext {
    const sectionIdx = radar.sections.findIndex(
      (s) => s.id === entry.sectionId
    );
    const section = radar.sections[sectionIdx];
    const ringIdx = radar.rings.findIndex((r) => r.id === entry.ringId);

    const startAngle =
      section.startAngle ??
      sectionIdx * ((2 * Math.PI) / radar.sections.length);
    const endAngle =
      section.endAngle ??
      (sectionIdx + 1) * ((2 * Math.PI) / radar.sections.length);

    return {
      radar,
      entry,
      ringWidth,
      section,
      sectionIdx,
      ringIdx,
      startAngle,
      endAngle,
    };
  }

  abstract place(radar: Radar, entry: Entry, ringWidth: number): Point;
}
