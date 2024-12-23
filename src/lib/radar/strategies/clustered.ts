import type { Entry, Radar } from '~/types/radar.js';
import { PlacementStrategy } from './base.js';
import type { ClusteredPlacementOptions } from './types.js';

export class ClusteredStrategy extends PlacementStrategy<ClusteredPlacementOptions> {
  place(radar: Radar, entry: Entry, ringWidth: number) {
    const ctx = this.getContext(radar, entry, ringWidth);
    if (!ctx.section) return { x: 0, y: 0 };

    const clustersCount = this.options.clustersCount ?? 3;
    const entriesInSection = radar.entries.filter(
      (e) => e.sectionId === entry.sectionId
    );

    // TODO add id
    const clusterIdx =
      entriesInSection.findIndex((e) => e === entry) % clustersCount;

    const angleStep = (ctx.endAngle - ctx.startAngle) / clustersCount;
    const angle = ctx.startAngle + angleStep * clusterIdx + angleStep * 0.5;

    const innerRadius = ctx.ringIdx * ringWidth;
    const outerRadius = (ctx.ringIdx + 1) * ringWidth;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;

    return {
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    };
  }
}
