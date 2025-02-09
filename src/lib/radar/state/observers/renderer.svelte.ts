import type { StateObserver } from "$lib/radar/state/observers/types.js";
import type { AppState } from "$lib/radar/state/types.js";
import * as d3 from "d3";

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
			radius: Math.min(width, height) / 2.5,
			center: { x: width / 2, y: height / 2 },
		};
	}

	#getOrCreateLayer<T, K extends d3.BaseType>(
		id: string,
		factory: () => Layer<T, K>,
	) {
		if (!this.#layers.has(id)) {
			const layer = factory();
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
		return radar.entries.flatMap((entry) => {
			const section = this.#sections.get(entry.sectionId);
			const ring = this.#rings.get(entry.ringId);
			if (!section || !ring) return [];
			return [
				{
					...entry,
					section,
					ring,
				},
			];
		});
	}

	#enrichSections(radar: Radar): EnrichedSection[] {
		const sectionEntries = radar.entries.reduce((map, entry) => {
			if (!map.has(entry.sectionId)) {
				map.set(entry.sectionId, []);
			}
			map.get(entry.sectionId)?.push(entry);
			return map;
		}, new Map<Section["id"], Entry[]>());

		return radar.sections.map((section) => {
			const entries = sectionEntries.get(section.id) ?? [];

			const ringEntries = entries.reduce((map, entry) => {
				if (!map.has(entry.ringId)) {
					map.set(entry.ringId, []);
				}
				map.get(entry.ringId)?.push(entry);
				return map;
			}, new Map<Ring["id"], Entry[]>());

			const rings = Array.from(ringEntries.entries()).flatMap(
				([ringId, entries]) => {
					const ring = this.#rings.get(ringId);

					if (!ring) return [];
					return [
						{
							...ring,
							entries,
						},
					];
				},
			);

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

		if (state.radarConfig.showLabels) {
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
