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

type Props = {
	target: SVGElement;
	container: Container;
};

export class RadarRenderer implements StateObserver {
	#target = $state({} as d3.Selection<SVGElement, unknown, null, undefined>);
	#container = $state<Container>({ width: 500, height: 500 });

	#sections = new Map<Section["id"], Section>();
	#rings = new Map<Ring["id"], Ring>();

	#state = $state<AppState | null>(null);

	dimensions = $derived.by(() => ({
		width: this.#container.width,
		height: this.#container.height,
		radius: Math.min(this.#container.width, this.#container.height) / 3,
		center: { x: this.#container.width / 2, y: this.#container.height / 2 },
	}));

	// biome-ignore lint/suspicious/noExplicitAny: Map acts as a dictionary
	#layers: Map<string, Layer<any, any>> = new Map();

	constructor(props: Props) {
		this.#target = d3.select(props.target);
		this.#container = props.container;
	}

	#getOrCreateLayer<T, K extends d3.BaseType>(
		id: string,
		create: () => Layer<T, K>,
	) {
		const layer = this.#layers.has(id);

		if (!layer) {
			const layer = create() as Layer<T, K>;
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
	update(state: AppState) {
		this.#state = state;

		if (!this.#state) {
			return;
		}
		this.#cache(state.radar);
		const context = {
			dimensions: this.dimensions,
			config: state.radarConfig,
			radar: state.radar,
		};
		const ringLayer = this.#getOrCreateLayer(
			"ring",
			() => new RingLayer("ring", this.#target, context),
		);
		ringLayer.update(context, state.radar.rings);

		const sectionLayer = this.#getOrCreateLayer(
			"section",
			() =>
				new SectionLayer("section", this.#target, {
					dimensions: this.dimensions,
					config: state.radarConfig,
					radar: state.radar,
				}),
		);

		sectionLayer.update(context, state.radar.sections);

		const entryLayer = this.#getOrCreateLayer(
			"entry",
			() => new EntryLayer("entry", this.#target, context),
		);
		entryLayer.update(context, this.#enrichEntries(state.radar));

		const labelLayer = this.#getOrCreateLayer(
			"label",
			() => new LabelLayer("label", this.#target, context),
		);

		if (state.radarConfig.showLabels) {
			const enriched = this.#enrichSections(state.radar);

			labelLayer.update(context, enriched);
		} else {
			labelLayer.clear();
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

	resize(container: Container) {
		this.#container = container;
		if (this.#state) {
			this.update(this.#state);
		}
	}
}
