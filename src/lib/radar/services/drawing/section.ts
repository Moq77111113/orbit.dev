import type { Target } from '~/types/radar-options.js';
import type { Section } from '~/types/radar.js';
import { DrawService } from './base.js';
type SectionOptions = {
  section: Section;
  sectionIdx?: number;
};

export class SectionService extends DrawService {
  addSection(target: Target, options: SectionOptions) {
    const { sectionIdx = this.radar.sections.length } = options;

    const { radius } = this.radar.geometry;
    const config = this.radar.config;

    const angle = ((2 * Math.PI) / this.radar.sections.length) * sectionIdx;

    target
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', Math.cos(angle) * radius)
      .attr('y2', Math.sin(angle) * radius)
      .attr('stroke', config.theme.colors.grid)
      .attr('stroke-width', config.theme.sizes.strokeWidth)
      .attr('stroke-dasharray', '4,4');
  }

  draw(target: Target) {
    for (const [i, section] of this.radar.sections.entries()) {
      this.addSection(target, { section, sectionIdx: i });
    }
  }
}
