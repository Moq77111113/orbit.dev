import type { StateObserver } from "$lib/radar/state/observers/types.js";
import type { AppState } from "$lib/radar/state/types.js";
import * as d3 from "d3";

import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
import type {
	Entry,
	Radar,
	Ring,
	Section,
} from "$lib/radar/core/elements/types.js";
import type {
	Container,
	EnrichedSection,
} from "$lib/radar/features/layers/base/types.js";
import {
	EntryLayer,
	type Layer,
	RingLayer,
	SectionLayer,
} from "$lib/radar/features/layers/index.js";
import { LabelLayer } from "$lib/radar/features/layers/label/label.layer.js";

type RadarRendererProps = {
	target: SVGElement;
	container: Container;
};

interface RadarContext {
	dimensions: {
		width: number;
		height: number;
		radius: number;
		center: { x: number; y: number };
	};
	config: AppState["radarConfig"];
	radar: Radar;
}

export class RadarRenderer implements StateObserver {
	readonly #target: d3.Selection<SVGElement, unknown, null, undefined>;
	#container: Container;
	#sections = new Map<Section["id"], Section>();
	#rings = new Map<Ring["id"], Ring>();

	#state = $state<AppState | null>(null);

	// biome-ignore lint/suspicious/noExplicitAny: Acts as a dictionary
	#layers = new Map<string, Layer<any, any>>();

	#isMobile = new IsMobile();
	constructor({ target, container }: RadarRendererProps) {
		this.#target = d3.select(target);
		this.#container = container;
	}

	private getContext(): RadarContext | null {
		if (!this.#state) return null;

		return {
			dimensions: this.dimensions,
			config: this.#state.radarConfig,
			radar: this.#state.radar,
		};
	}

	get dimensions() {
		const { width, height } = this.#container;
		return {
			width,
			height,
			radius: Math.min(width, height) / 3,
			center: { x: width / 2, y: height / 2 },
		};
	}

	#getOrCreateLayer<T, K extends d3.BaseType>(
		id: string,
		factory: () => Layer<T, K>,
	) {
		const layer = this.#layers.has(id);

		if (!layer) {
			const layer = factory() as Layer<T, K>;
			this.#layers.set(id, layer);
		}

		return this.#layers.get(id) as Layer<T>;
	}

	#cache(radar: Radar) {
		this.#sections.clear();
		this.#rings.clear();

		for (const section of radar.sections) {
			this.#sections.set(section.id, section);
		}

		for (const ring of radar.rings) {
			this.#rings.set(ring.id, ring);
		}
	}

	#enrichEntries(radar: Radar) {
		return radar.entries
			.map((entry) => {
				const section = this.#sections.get(entry.sectionId);
				const ring = this.#rings.get(entry.ringId);
				if (!section || !ring) return null;
				return {
					...entry,
					section,
					ring,
				};
			})
			.filter((v) => v !== null);
	}

	#enrichSections(radar: Radar): EnrichedSection[] {
		const sectionEntries = new Map<Section["id"], Entry[]>();
		for (const entry of radar.entries) {
			if (!sectionEntries.has(entry.sectionId)) {
				sectionEntries.set(entry.sectionId, []);
			}
			sectionEntries.get(entry.sectionId)?.push(entry);
		}

		return radar.sections.map((section) => {
			const entries = sectionEntries.get(section.id) ?? [];

			const ringEntries = new Map<Ring["id"], Entry[]>();
			for (const entry of entries) {
				if (!ringEntries.has(entry.ringId)) {
					ringEntries.set(entry.ringId, []);
				}
				ringEntries.get(entry.ringId)?.push(entry);
			}

			const rings = Array.from(ringEntries.entries())
				.map(([ringId, entries]) => {
					const ring = this.#rings.get(ringId);

					if (!ring) return null;
					return {
						...ring,
						entries,
					};
				})
				.filter((v) => v !== null);
			return {
				...section,
				rings,
			};
		});
	}

	update(state: AppState) {
		this.#state = state;
		const context = this.getContext();
		if (!context) {
			return;
		}

		this.#cache(state.radar);

		const ringLayer = this.#getOrCreateLayer(
			"ring",
			() =>
				new RingLayer({
					id: "ring",
					parent: this.#target,
					context,
				}),
		);
		ringLayer.update(context, state.radar.rings);

		const sectionLayer = this.#getOrCreateLayer(
			"section",
			() =>
				new SectionLayer({
					id: "section",
					parent: this.#target,
					context,
				}),
		);

		sectionLayer.update(context, state.radar.sections);

		const entryLayer = this.#getOrCreateLayer(
			"entry",
			() =>
				new EntryLayer({
					id: "entry",
					parent: this.#target,
					context,
				}),
		);
		entryLayer.update(context, this.#enrichEntries(state.radar));

		const labelLayer = this.#getOrCreateLayer(
			"label",
			() =>
				new LabelLayer({
					id: "label",
					parent: this.#target,
					context,
				}),
		);

		if (state.radarConfig.showLabels && !this.#isMobile.current) {
			const enriched = this.#enrichSections(state.radar);

			labelLayer.update(context, enriched);
		} else {
			labelLayer.clear();
		}
	}

	resize(container: Container) {
		this.#container = container;
		if (this.#state) {
			this.update(this.#state);
		}
	}
}
