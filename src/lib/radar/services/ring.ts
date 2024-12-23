import type { Ring, Target } from '~/types/radar.js';
import { DrawService } from './base.js';

type RingOptions = {
  ring: Ring;
  ringIdx?: number;
};

export class RingService extends DrawService {
  addRing(target: Target, options: RingOptions) {
    const { ring, ringIdx = this.radar.rings.length - 1 } = options;
    const { radius } = this.radar.geometry;
    const config = this.radar.config;
    const ringWidth = radius / this.radar.rings.length;

    const outerRadius = (ringIdx + 1) * ringWidth;
    const innerRadius = ringIdx * ringWidth;
    const textRadius = innerRadius + ringWidth / 2;

    target
      .append('circle')
      .attr('r', outerRadius)
      .attr('fill', 'none')
      .attr('stroke', ring.color ?? config.theme.colors.ring)
      .attr('stroke-width', config.theme.sizes.strokeWidth);

    const pathId = `ring-label-path-${ring.id}`;
    target
      .append('defs')
      .append('path')
      .attr('id', pathId)
      .attr(
        'd',
        `M -${textRadius} 0 A ${textRadius} ${textRadius} 0 0 1 ${textRadius} 0`
      );

    if (config.showLabels) {
      target
        .append('text')
        .style('fill', ring.color ?? config.theme.colors.text)
        .style('font-size', `${config.theme.fontSizes.rings}px`)
        .style('opacity', config.theme.opacity.text)
        .style('font-weight', 'bold')
        .style('pointer-events', 'none')
        .append('textPath')
        .attr('href', `#${pathId}`)
        .attr('startOffset', '50%')
        .attr('text-anchor', 'middle')
        .text(ring.name);
    }
  }

  draw(target: Target) {
    for (const [id, ring] of this.radar.rings.entries()) {
      this.addRing(target, { ring, ringIdx: id });
    }
  }
}
