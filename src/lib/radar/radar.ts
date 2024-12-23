import * as d3 from 'd3';
import type { Container, Geometry, Target } from '~/types/radar-options.js';
import type { Radar, Ring, Section } from '~/types/radar.js';
import type { RadarConfig } from '~/types/theme.js';
import { defaultConfig } from '../theme.js';
import {
  EntryService,
  ListService,
  RingService,
  SectionService,
} from './services/drawing/index.js';
import type { PlacementStrategy } from './strategies/index.js';
import { RandomStrategy } from './strategies/random.js';

type RadarServiceOptions = {
  strategy?: PlacementStrategy;
  container?: { width: number; height: number };
  config?: Partial<RadarConfig>;
};

export class RadarService {
  #radar: Radar;
  protected radarConfig: RadarConfig = defaultConfig;
  #source: SVGElement | null = null;
  #container: Container = { width: 500, height: 500 };
  #target: Target | null = null;
  #listContainer: Target | null = null;
  #strategy: PlacementStrategy = new RandomStrategy();
  #geometry: Geometry;

  readonly #ringService: RingService;
  readonly #sectionService: SectionService;
  readonly #entryService: EntryService;
  readonly #listService: ListService;

  constructor(radar: Radar, options?: RadarServiceOptions) {
    this.#radar = this.#validateRadar(radar);
    this.#ringService = new RingService(this);
    this.#sectionService = new SectionService(this);
    this.#entryService = new EntryService(this);
    this.#listService = new ListService(this);

    this.#applyOptions(options);
    this.#geometry = this.#calculateGeometry();
  }

  draw(svg: SVGElement) {
    this.#source = svg;
    const element = d3.select(svg);

    element.selectAll('*').remove();
    this.#listContainer = element.append('g').attr('class', 'list');
    this.#target = element
      .append('g')
      .attr(
        'transform',
        `translate(${this.#geometry.center.x}, ${this.#geometry.center.y})`
      );

    const { center } = this.#geometry;

    this.#listContainer.attr('transform', `translate(0 0)`);
    this.#target
      .attr('transform', `translate(${center.x} ${center.y})`)
      .style(
        'background-color',
        this.config.theme.colors.background ?? '#ffffff'
      );

    this.#sectionService.draw(this.#target);
    this.#ringService.draw(this.#target);
    this.#entryService.draw(this.#target);
    this.#listService.draw(this.#listContainer);
  }

  addRing(payload: Pick<Ring, 'name' | 'color'>) {
    if (!this.#target) {
      throw new Error('Cannot add ring before drawing the radar');
    }
    const id = crypto.getRandomValues(new Uint32Array(1))[0];
    const ring = {
      ...payload,
      id: `rng-${id}` as const,
    };
    this.#radar.rings.push(ring);
    this.#ringService.addRing(this.#target, { ring });
  }

  addSection(payload: Pick<Section, 'name' | 'color'>) {
    if (!this.#target) {
      throw new Error('Cannot add section before drawing the radar');
    }
    const section = {
      ...payload,
      id: `sec-${this.#radar.sections.length}` as const,
    };
    this.#radar.sections.push(section);
    this.#sectionService.addSection(this.#target, { section });
  }

  resize(container: Container): void {
    this.#container = container;
    this.#geometry = this.#calculateGeometry();

    if (this.#target) {
      const svg = this.#target.node()?.ownerSVGElement;
      if (svg) {
        this.draw(svg);
      }
    }
  }

  #validateRadar(radar: Radar): Radar {
    if (!radar.rings?.length || !radar.sections?.length) {
      throw new Error('Invalid radar data: Must contain rings and sections');
    }
    return radar;
  }

  #applyOptions(options?: RadarServiceOptions): void {
    if (options?.strategy) this.#strategy = options.strategy;
    if (options?.container) this.#container = options.container;
    if (options?.config) {
      this.radarConfig = this.#deepMergeConfig(this.config, options.config);
    }
  }

  #calculateGeometry(): Geometry {
    const { width, height } = this.#container;

    if (this.#radar.sections.length > 4) {
      return {
        radius: Math.min(width, height) / 4,
        center: { x: width / 2, y: height / 3 },
        corners: [
          { x: 0, y: 0 },
          { x: width, y: 0 },
          { x: width, y: height },
          { x: 0, y: height },
        ],
      };
    }

    return {
      radius: Math.min(width, height) / 3,
      center: { x: width / 3, y: height / 3 },
      corners: [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: 0, y: height },
      ],
    };
  }

  #deepMergeConfig(
    base: RadarConfig,
    override: Partial<RadarConfig>
  ): RadarConfig {
    return {
      ...base,
      ...override,
      theme: {
        ...base.theme,
        ...override.theme,
        colors: { ...base.theme.colors, ...override.theme?.colors },
        opacity: { ...base.theme.opacity, ...override.theme?.opacity },
        sizes: { ...base.theme.sizes, ...override.theme?.sizes },
      },
    };
  }

  get rings() {
    return this.#radar.rings;
  }

  get sections() {
    return this.#radar.sections;
  }

  get entries() {
    return this.#radar.entries;
  }

  get title() {
    return this.#radar.title;
  }

  get strategy() {
    return this.#strategy;
  }

  get config() {
    return this.radarConfig;
  }

  get geometry() {
    return this.#geometry;
  }
  get size() {
    return this.#container;
  }

  changePosition(position: RadarConfig['entryPlacement']) {
    if (!this.#source) {
      throw new Error('Cannot change position before drawing the radar');
    }
    this.radarConfig.entryPlacement = position;
    this.draw(this.#source);
  }
}
