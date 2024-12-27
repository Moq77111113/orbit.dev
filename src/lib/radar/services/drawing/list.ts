import type { Target } from '~/types/radar-options.js';
import type { Entry, Ring, Section } from '~/types/radar.js';
import { DrawService } from './base.js';
import { EntryService } from './entry.js';
type SectionToRingToEntries = Map<string, Map<string, Entry[]>>;
type RingToEntries = Map<string, Entry[]>;

export class ListService extends DrawService {
  get padding() {
    return this.radar.geometry.radius / 4 + 10;
  }
  get QUADRANTS() {
    const { width, height } = this.radar.size;
    const { radius } = this.radar.geometry;
    return {
      topRight: {
        x: width - radius,
        y: this.padding,
      },
      topLeft: {
        x: this.padding,
        y: this.padding,
      },
      bottomLeft: {
        x: this.padding,
        y: (height - radius) / 2 + this.padding,
      },
      bottomRight: {
        x: width - radius,
        y: (height - radius) / 2 + this.padding,
      },
    };
  }

  draw(target: Target) {
    const { entries, rings, sections } = this.radar;
    const map = this.groupEntriesBySectionAndRing(entries, sections);

    for (const [idx, section] of sections.entries()) {
      const ringToEntries = map.get(section.id);
      if (!ringToEntries) return;

      const useQuadrants = idx < 4;
      const position = useQuadrants
        ? this.getQuadrantPosition(idx)
        : this.getOverflowPosition(idx - 4);

      this.drawSectionList(target, section, rings, ringToEntries, position);
    }
  }

  private groupEntriesBySectionAndRing(
    entries: Entry[],
    sections: Section[]
  ): SectionToRingToEntries {
    return sections.reduce<SectionToRingToEntries>((acc, section) => {
      const relatedEntries = entries.filter(
        (entry) => entry.sectionId === section.id
      );
      const perRing = relatedEntries.reduce<RingToEntries>((acc, entry) => {
        if (!acc.has(entry.ringId)) {
          acc.set(entry.ringId, []);
        }
        acc.get(entry.ringId)?.push(entry);
        return acc;
      }, new Map());
      acc.set(section.id, perRing);
      return acc;
    }, new Map());
  }

  private getQuadrantPosition(sectionIndex: number) {
    const positions = [
      this.QUADRANTS.topRight,
      this.QUADRANTS.topLeft,
      this.QUADRANTS.bottomLeft,
      this.QUADRANTS.bottomRight,
    ];
    return positions[sectionIndex] || positions[0];
  }

  private getOverflowPosition(index: number) {
    {
      const { width, height } = this.radar.size;
      const { radius } = this.radar.geometry;
      const quadrantWidth = (width - radius) / 4;
      const x = this.padding + index * quadrantWidth;

      const y = height - radius - this.padding;
      return {
        x,
        y,
      };
    }
  }
  private drawSectionList(
    target: Target,
    section: Section,
    rings: Ring[],
    ringToEntries: RingToEntries,
    position: { x: number; y: number }
  ) {
    const quadrant = target
      .append('g')
      .attr('class', `quadrant-list`)
      .attr('transform', `translate(${position.x}, ${position.y})`);

    const sectionText = quadrant
      .append('text')
      .attr('class', 'section-header')
      .attr('dy', '1em')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .style('display', 'flex')
      .style('justify-content', 'center')
      .style('align-items', 'center')
      .style('text-overflow', 'ellipsis')
      .style('overflow', 'hidden')
      .style('fill', this.radar.config.theme.colors.text)
      .text(section.name);

    this.truncateText(
      sectionText,
      section.name,
      this.radar.geometry.radius - 20
    );

    let yOffset = 25;

    rings.forEach((ring) => {
      const entries = ringToEntries.get(ring.id) || [];
      if (entries.length === 0) return;

      quadrant
        .append('text')
        .attr('class', 'ring-header')
        .attr('dy', yOffset + 'px')
        .style('background-color', 'red')
        .style('font-weight', 'bold')
        .style('font-size', '12px')
        .style('display', 'flex')
        .style('fill', ring.color || this.radar.config.theme.colors.ring)
        .text(ring.name);

      yOffset += 10;

      entries.forEach((entry) => {
        const entryGroup = quadrant
          .append('g')
          .attr('transform', `translate(10, ${yOffset})`)
          .attr('fill', 'red')
          .style('cursor', 'pointer')
          .on('mouseover', (ev, i) => {
            EntryService.triggerTooltip(entry);
          })
          .on('mouseout', (ev, i) => {
            EntryService.hideTooltip(entry);
          });

        this.drawEntryMarker(entryGroup, entry);

        const entryText = entryGroup
          .append('text')
          .attr('x', 10)
          .attr('dy', '0.32em')
          .style('font-size', '12px')
          .attr('fill', this.radar.config.theme.colors.text);

        this.truncateText(entryText, entry.name, 100 - 20);

        yOffset += 15;
      });

      yOffset += 10;
    });
  }

  private truncateText(
    textElement: d3.Selection<SVGTextElement, unknown, null, undefined>,
    fullText: string,
    maxWidth: number
  ) {
    textElement.text(fullText);

    const getTextWidth = () => {
      const node = textElement.node();
      return node ? node.getComputedTextLength() : 0;
    };

    if (getTextWidth() > maxWidth) {
      let text = fullText;
      while (getTextWidth() > maxWidth && text.length > 0) {
        text = text.slice(0, -1);
        textElement.text(text + '...');
      }

      textElement.append('title').text(fullText);
    }
  }

  private drawEntryMarker(group: Target, entry: Entry) {
    const shape = EntryService.createShape(entry, 20);
    shape(group).attr('fill', this.radar.config.theme.colors.text);
  }
}
