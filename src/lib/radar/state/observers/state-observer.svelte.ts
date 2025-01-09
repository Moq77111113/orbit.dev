import type { StateObserver } from "$lib/radar/state/observers/types.js";
import type { AppState } from "$lib/radar/state/types.js";
import * as d3 from "d3";
import type { Container } from "~/types/radar-options.js";

import type { Radar } from "$lib/radar/core/elements/types.js";
import {
	EntryLayer,
	type Layer,
	RingLayer,
	SectionLayer,
} from "$lib/radar/features/layers/index.js";

type Props = {
	target: SVGElement;
	container: Container;
};

export class RadarRenderer implements StateObserver {
	#target = $state({} as d3.Selection<SVGElement, unknown, null, undefined>);
	#container = $state<Container>({ width: 500, height: 500 });

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

	update(state: AppState) {
		this.#state = state;

		if (!this.#state) {
			return;
		}
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
			() =>
				new EntryLayer("entry", this.#target, {
					dimensions: this.dimensions,
					config: state.radarConfig,
					radar: state.radar,
				}),
		);
		entryLayer.update(context, this.#enrichEntries(state.radar));
	}

	#enrichEntries(radar: Radar) {
		const sections = new Map(radar.sections.map((s) => [s.id, s]));
		const rings = new Map(radar.rings.map((r) => [r.id, r]));

		return radar.entries
			.map((entry) => {
				const section = sections.get(entry.sectionId);
				const ring = rings.get(entry.ringId);
				if (!section || !ring) return null;
				return {
					...entry,
					section,
					ring,
				};
			})
			.filter((v) => v !== null);
	}

	resize(container: Container) {
		this.#container = container;
	}
}
