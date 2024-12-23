import type { Entry, Radar } from '~/types/radar.js';
import { PlacementStrategy } from './base.js';
import type { DistributedPlacementOptions } from './types.js';

export class DistributedStrategy extends PlacementStrategy<DistributedPlacementOptions> {
  place(radar: Radar, entry: Entry, ringWidth: number) {
    const ctx = this.getContext(radar, entry, ringWidth);
    if (!ctx.section) return { x: 0, y: 0 };

    const jitter = this.options.jitter ?? 0.2;
    const entriesInSection = radar.entries.filter(
      (e) => e.sectionId === entry.sectionId
    );

    // TODO add id
    const position = entriesInSection.findIndex((e) => e === entry);
    const count = entriesInSection.length;

    const angle =
      ctx.startAngle +
      (ctx.endAngle - ctx.startAngle) * (position / count) +
      (Math.random() - 0.5) * jitter;

    const innerRadius = ctx.ringIdx * ringWidth;
    const outerRadius = (ctx.ringIdx + 1) * ringWidth;
    const r =
      innerRadius +
      (outerRadius - innerRadius) * 0.5 +
      (Math.random() - 0.5) * (outerRadius - innerRadius) * 0.3;

    return {
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    };
  }
}
