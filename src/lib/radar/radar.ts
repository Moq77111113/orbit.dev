import * as d3 from "d3";
import type { Container, Geometry, Target } from "~/types/radar-options.js";
import type { Radar, Ring, Section } from "~/types/radar.js";
import type { RadarConfig, RadarEntryPlacement } from "~/types/theme.js";

import { defaultConfig } from "../theme.js";
import { EntryService } from "./services/drawing/entry.js";
import { ListService } from "./services/drawing/list.js";
import { RingService } from "./services/drawing/ring.js";
import { SectionService } from "./services/drawing/section.js";
import type { PlacementStrategy } from "./strategies/base.js";
import { RandomStrategy } from "./strategies/random.js";
interface RadarServiceOptions {
	strategy?: PlacementStrategy;
	container?: Container;
	config?: Partial<RadarConfig>;
}

export class RadarService {
	readonly #state: {
		radar: Radar;
		source: SVGElement | null;
		container: Container;
		target: Target | null;
		listContainer: Target | null;
		placement: RadarEntryPlacement;
		strategy: PlacementStrategy;
		geometry: Geometry;
	};

	#radarConfig: RadarConfig;

	readonly #services: {
		ring: RingService;
		section: SectionService;
		entry: EntryService;
		list: ListService;
	};

	constructor(radar: Radar, options?: RadarServiceOptions) {
		this.#validateRadar(radar);

		this.#state = {
			radar,
			source: null,
			target: null,
			container: { width: 500, height: 500 },
			listContainer: null,
			placement: "random",
			strategy: new RandomStrategy(),
			geometry: this.#calculateGeometry({ width: 500, height: 500 }, radar),
		};

		this.#radarConfig = defaultConfig;
		if (options?.config) {
			this.#radarConfig = this.#mergeConfig(this.#radarConfig, options.config);
		}
		this.#services = {
			ring: new RingService(this),
			section: new SectionService(this),
			entry: new EntryService(this),
			list: new ListService(this),
		};

		if (options?.strategy) this.#state.strategy = options.strategy;
		if (options?.container) {
			this.#state.container = options.container;
			this.#state.geometry = this.#calculateGeometry(options.container, radar);
		}
	}

	draw(svg: SVGElement): void {
		this.#state.source = svg;
		const element = d3.select(svg);

		element.selectAll("*").remove();

		this.#setupContainers(element);

		this.#drawComponents();
	}

	addRing(payload: Pick<Ring, "name" | "color">) {
		this.#ensureTargetExists("ring");

		const ring = this.#createRing(payload);
		this.#state.radar.rings.push(ring);

		if (this.#state.target) {
			this.#services.ring.addRing(this.#state.target, { ring });
		}
		this.redraw();
		return ring;
	}

	moveRing(ring: Ring, direction: -1 | 1) {
		this.#ensureSourceExists("ring");

		const index = this.#state.radar.rings.findIndex((r) => r.id === ring.id);
		const newIndex = direction + index;

		if (newIndex < 0 || newIndex >= this.#state.radar.rings.length)
			return this.#state.radar.rings;

		[this.#state.radar.rings[index], this.#state.radar.rings[newIndex]] = [
			this.#state.radar.rings[newIndex],
			this.#state.radar.rings[index],
		];

		this.redraw();
		return this.#state.radar.rings;
	}

	addSection(payload: Pick<Section, "name" | "color">) {
		this.#ensureTargetExists("section");

		const section = this.#createSection(payload);
		this.#state.radar.sections.push(section);

		if (this.#state.target) {
			this.#services.section.addSection(this.#state.target, { section });
		}
		this.redraw();
		return section;
	}

	changePosition(position: RadarEntryPlacement): void {
		this.#ensureSourceExists("position");

		this.#radarConfig = this.#mergeConfig(this.#radarConfig, {
			entryPlacement: position,
		});
		this.#state.placement = position;

		this.redraw();
	}

	changeTheme(theme: Partial<RadarConfig["theme"]>): void {
		this.#ensureSourceExists("theme");

		this.#radarConfig = this.#mergeConfig(this.#radarConfig, {
			theme: { ...this.#radarConfig.theme, ...theme },
		});

		this.redraw();
	}

	resize(container: Container): void {
		this.#state.container = container;
		this.#state.geometry = this.#calculateGeometry(
			container,
			this.#state.radar,
		);
		this.redraw();
	}

	#setupContainers(
		element: d3.Selection<SVGElement, unknown, null, undefined>,
	): void {
		const { geometry } = this.#state;

		this.#state.listContainer = element.append("g").attr("class", "list");
		this.#state.target = element
			.append("g")
			.attr(
				"transform",
				`translate(${geometry.center.x}, ${geometry.center.y})`,
			);

		this.#state.listContainer.attr("transform", "translate(0 0)");
		this.#state.target
			.attr("transform", `translate(${geometry.center.x} ${geometry.center.y})`)
			.style("background-color", this.#radarConfig.theme.colors.ring);
	}

	#drawComponents(): void {
		if (!this.#state.target || !this.#state.listContainer) return;

		this.#services.section.draw(this.#state.target);
		this.#services.ring.draw(this.#state.target);
		this.#services.entry.draw(this.#state.target);
		this.#services.list.draw(this.#state.listContainer);
	}

	#createRing(payload: Pick<Ring, "name" | "color">): Ring {
		const id = crypto.getRandomValues(new Uint32Array(1))[0];
		return {
			...payload,
			id: `rng-${id}` as const,
		};
	}

	#createSection(payload: Pick<Section, "name" | "color">): Section {
		return {
			...payload,
			id: `sec-${this.#state.radar.sections.length}` as const,
		};
	}

	#validateRadar(radar: Radar): void {
		if (!radar.rings?.length || !radar.sections?.length) {
			throw new Error("Invalid radar data: Must contain rings and sections");
		}
	}

	#calculateGeometry(container: Container, radar: Radar): Geometry {
		const { width, height } = container;
		const baseGeometry = {
			corners: [
				{ x: 0, y: 0 },
				{ x: width, y: 0 },
				{ x: width, y: height },
				{ x: 0, y: height },
			],
		} satisfies Pick<Geometry, "corners">;

		return radar.sections.length > 4
			? {
					...baseGeometry,
					radius: Math.min(width, height) / 4,
					center: { x: width / 2, y: height / 3 },
				}
			: {
					...baseGeometry,
					radius: Math.min(width, height) / 3,
					center: { x: width / 3, y: height / 3 },
				};
	}

	#mergeConfig(base: RadarConfig, override: Partial<RadarConfig>): RadarConfig {
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

	#ensureTargetExists(operation: string): void {
		if (!this.#state.target) {
			throw new Error(`Cannot add ${operation} before drawing the radar`);
		}
	}

	#ensureSourceExists(operation: string): void {
		if (!this.#state.source) {
			throw new Error(`Cannot change ${operation} before drawing the radar`);
		}
	}

	private redraw(): void {
		if (this.#state.source) {
			this.draw(this.#state.source);
		}
	}

	get rings() {
		return this.#state.radar.rings;
	}
	get sections() {
		return this.#state.radar.sections;
	}
	get entries() {
		return this.#state.radar.entries;
	}
	get title() {
		return this.#state.radar.title;
	}
	get strategy() {
		return this.#state.strategy;
	}
	get config() {
		return this.#radarConfig;
	}
	get geometry() {
		return this.#state.geometry;
	}
	get size() {
		return this.#state.container;
	}
	get placement() {
		return this.#state.placement;
	}
}
