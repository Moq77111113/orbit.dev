import type { Entry, Radar } from '~/types/radar.js';
import { PlacementStrategy, type RandomPlacementOptions } from './index.js';

export class RandomStrategy extends PlacementStrategy<RandomPlacementOptions> {
  place(radar: Radar, entry: Entry, ringWidth: number) {
    const ctx = this.getContext(radar, entry, ringWidth);
    if (!ctx.section) return { x: 0, y: 0 };

    const angle =
      ctx.startAngle + Math.random() * (ctx.endAngle - ctx.startAngle);
    const innerRadius = ctx.ringIdx * ringWidth;
    const outerRadius = (ctx.ringIdx + 1) * ringWidth;
    const r = innerRadius + Math.random() * (outerRadius - innerRadius);

    return {
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    };
  }
}
