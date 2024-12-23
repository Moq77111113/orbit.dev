import type { Entry, Radar } from '~/types/radar.js';
import { PlacementStrategy, type SpiralPlacementOptions } from './index.js';

export class SpiralStrategy extends PlacementStrategy<SpiralPlacementOptions> {
  place(radar: Radar, entry: Entry, ringWidth: number) {
    const ctx = this.getContext(radar, entry, ringWidth);
    if (!ctx.section) return { x: 0, y: 0 };
    const spiralStep = this.options.spiralStep ?? 0.1;

    const entriesInSection = radar.entries.filter(
      (e) => e.sectionId === entry.sectionId
    );

    const position = entriesInSection.findIndex((e) => e === entry);

    const angle = ctx.startAngle + position * spiralStep;

    const innerRadius = ctx.ringIdx * ringWidth;
    const outerRadius = (ctx.ringIdx + 1) * ringWidth;
    const r = innerRadius + ((position % 5) * (outerRadius - innerRadius)) / 5;

    return {
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    };
  }
}
