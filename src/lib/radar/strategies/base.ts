import type { Entry, Radar } from '~/types/radar.js';
import type { PlacementContext, PlacementOptions, Point } from './types.js';

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
