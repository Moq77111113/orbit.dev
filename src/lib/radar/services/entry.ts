import * as d3 from 'd3';
import type { Entry } from '~/types/radar.js';

import type { Target } from '~/types/radar-options.js';
import { DrawService } from './base.js';

type EntryOptions = {
  entry: Entry;
};

export class EntryService extends DrawService {
  #tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null =
    null;

  get tooltip() {
    if (this.#tooltip) {
      return this.#tooltip;
    }

    this.#tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    return this.#tooltip;
  }

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
    const section = this.radar.sections.find(
      (s) => s.id === options.entry.sectionId
    );
    if (!ring || !section) {
      return;
    }
    const group = target
      .append('g')
      .attr('id', `entry-${options.entry.name}`)
      .attr('transform', `translate(${position.x}, ${position.y})`)
      .attr('class', 'entry')
      .style('cursor', this.radar.config.interactive ? 'pointer' : 'default');

    const shape = EntryService.shape(options.entry, theme.sizes.entry);

    shape(group)
      .attr('fill', ring?.color ?? theme.colors.ring)
      .attr('stroke', 'none')
      .style('opacity', theme.opacity.entries)
      .on('mouseover', (ev, i) => {
        this.tooltip.transition().duration(200).style('opacity', 0.9);

        this.tooltip
          .html(this.#html(options.entry))
          .style('border-color', ring?.color ?? theme.colors.ring)
          .style(
            'background-color',
            d3
              .color(ring?.color ?? theme.colors.ring)
              ?.copy({ opacity: 0.2 })
              ?.toString() ?? ''
          )
          .style('left', ev.pageX + 'px')
          .style('top', ev.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        this.tooltip.transition().duration(500).style('opacity', 0);  
        setTimeout(() => {
          this.#tooltip?.remove();
          this.#tooltip = null;
        }, 500);
      });
  }

  draw(target: Target) {
    for (const entry of this.radar.entries) {
      this.addEntry(target, { entry });
    }
  }

  static shape(entry: Entry, size: number) {
    return (element: Target) => {
      if (entry.moved) {
        // Triangle
        return element
          .append('path')
          .attr('d', d3.symbol().type(d3.symbolTriangle).size(size))
          .attr('transform', entry.moved > 0 ? 'rotate(180)' : '');
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

  #html(entry: Entry) {
    return `
        <h3>${entry.name}</h3>
        ${entry.description ? `<p>${entry.description}</p>` : ''}
        <p>${entry.link ? `<a href="${entry.link}">🔗</a>` : ''}</p>
    `;
  }
}
