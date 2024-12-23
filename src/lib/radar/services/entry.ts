import * as d3 from 'd3';
import type { Entry, Target } from '~/types/radar.js';

import { DrawService } from './base.js';

type EntryOptions = {
  entry: Entry;
};

export class EntryService extends DrawService {
  addEntry(target: Target, options: EntryOptions) {
    const { radius } = this.radar.geometry;
    const ringWidth = radius / this.radar.rings.length;

    const { theme } = this.radar.config;

    const position = this.radar.strategy.place(
      this.radar,
      options.entry,
      ringWidth
    );
    const ring = this.radar.rings.find((r) => r.id === options.entry.ringId);

    const group = target
      .append('g')
      .attr('transform', `translate(${position.x}, ${position.y})`)
      .attr('class', 'entry')
      .style('cursor', this.radar.config.interactive ? 'pointer' : 'default');

    const shape = this.#shape(options.entry, theme.sizes.entry);

    shape(group)
      .attr('fill', ring?.color ?? theme.colors.ring)
      .attr('stroke', 'none')
      .style('opacity', theme.opacity.entries);
  }

  draw(target: Target) {
    for (const entry of this.radar.entries) {
      this.addEntry(target, { entry });
    }
  }

  #shape(entry: Entry, size: number) {
    return (element: Target) => {
      if (entry.moved) {
        // Triangle
        return element
          .append('path')
          .attr('d', d3.symbol().type(d3.symbolTriangle).size(size))
          .attr('transform', entry.moved > 0 ? 'rotate(180' : '');
      }

      if (entry.isNew) {
        // Star
        return element
          .append('path')
          .attr('d', d3.symbol().type(d3.symbolStar).size(size));
      }

      // Circle
      return element
        .append('path')
        .attr('d', d3.symbol().type(d3.symbolCircle).size(size));
    };
  }
}
