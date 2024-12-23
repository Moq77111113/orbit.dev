import * as d3 from 'd3';
import type { Container, Geometry, Target } from '~/types/radar-options.js';
import type { Radar } from '~/types/radar.js';
import type { RadarConfig } from '~/types/theme.js';
import { defaultConfig } from '../theme.js';
import { EntryService } from './services/entry.js';
import { RingService } from './services/ring.js';
import { SectionService } from './services/section.js';
import type { PlacementStrategy } from './strategies/index.js';
import { RandomStrategy } from './strategies/random.js';

type RadarServiceOptions = {
  strategy?: PlacementStrategy;
  container?: { width: number; height: number };
  config?: Partial<RadarConfig>;
};

export class RadarService {
  #radar: Radar;
  #config: RadarConfig = defaultConfig;
  #container: Container = { width: 500, height: 500 };
  #target: Target | null = null;
  #strategy: PlacementStrategy = new RandomStrategy();

  readonly #ringService: RingService;
  readonly #sectionService: SectionService;
  readonly #entryService: EntryService;
  readonly #geometry: Geometry;

  constructor(radar: Radar, options?: RadarServiceOptions) {
    this.#radar = radar;
    this.#ringService = new RingService(this);
    this.#sectionService = new SectionService(this);
    this.#entryService = new EntryService(this);

    if (options?.strategy) {
      this.#strategy = options.strategy;
    }

    if (options?.container) {
      this.#container = options.container;
    }
    if (options?.config) {
      this.#config = { ...this.#config, ...options.config };
    }

    this.#geometry = {
      radius: Math.min(this.#container.width, this.#container.height) / 2,
      center: { x: this.#container.width / 2, y: this.#container.height / 2 },
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

  get config() {
    return this.#config;
  }

  get strategy() {
    return this.#strategy;
  }

  get geometry() {
    return this.#geometry;
  }

  draw(svg: SVGElement) {
    const element = d3.select(svg);

    element.selectAll('*').remove();

    this.#target = element
      .append('g')
      .attr(
        'transform',
        `translate(${this.#geometry.center.x}, ${this.#geometry.center.y})`
      );

    this.#sectionService.draw(this.#target);
    this.#ringService.draw(this.#target);
    this.#entryService.draw(this.#target);
  }
}
