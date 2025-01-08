import type { AppState } from "$lib/radar/state/types.js";
import * as d3 from "d3";
import type { StateObserver } from "~/lib/radar/state/observers/types.js";
import type { Container } from "~/types/radar-options.js";

import type { Layer } from "./layers/base.layer.js";
import { RingLayer } from "./layers/ring.layer.js";
import { SectionLayer } from "./layers/section.layer.js";

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

	#layers: Map<string, Layer<unknown>> = new Map();

	constructor(props: Props) {
		this.#target = d3.select(props.target);
		this.#container = props.container;
	}

	#getOrCreateLayer<T>(id: string, create: () => Layer<T>) {
		const layer = this.#layers.has(id);

		if (!layer) {
			this.#layers.set(id, create());
		}

		return this.#layers.get(id) as Layer<T>;
	}

	update(state: AppState) {
		this.#state = state;

		if (!this.#state) {
			return;
		}
		const ringLayer = this.#getOrCreateLayer(
			"ring",
			() =>
				new RingLayer("ring", this.#target, {
					dimensions: this.dimensions,
					config: state.radarConfig,
				}),
		);
		ringLayer.update(
			{ dimensions: this.dimensions, config: state.radarConfig },
			state.radar.rings,
		);

		const sectionLayer = this.#getOrCreateLayer(
			"section",
			() =>
				new SectionLayer("section", this.#target, {
					dimensions: this.dimensions,
					config: state.radarConfig,
				}),
		);

		sectionLayer.update(
			{ dimensions: this.dimensions, config: state.radarConfig },
			state.radar.sections,
		);
	}

	resize(container: Container) {
		this.#container = container;
	}

	#getOrCreateSectionsElement() {
		const sections = this.#target.select(".sections");

		if (sections.empty()) {
			return this.#target
				.append("g")
				.attr(
					"transform",
					`translate(${this.dimensions.center.x}, ${this.dimensions.center.y})`,
				)
				.attr("class", "sections");
		}

		return sections;
	}

	#render(state: AppState) {
		if (!this.#target) {
			return;
		}
		console.log("Rendering sections");

		const sections = this.#getOrCreateSectionsElement();
		for (const [i, section] of state.radar.sections.entries()) {
			const angle = ((2 * Math.PI) / state.radar.sections.length) * i;
			console.log("Rendering section", section.id, this.dimensions.radius);
			const exist = sections.select(`.${section.id}`);

			if (exist.empty()) {
				sections
					.append("line")
					.attr("x1", 0)
					.attr("y1", 0)
					.attr("x2", Math.cos(angle) * this.dimensions.radius)
					.attr("y2", Math.sin(angle) * this.dimensions.radius)
					.attr("stroke", state.radarConfig.theme.colors.grid)
					.attr("stroke-width", state.radarConfig.theme.sizes.strokeWidth)
					.attr("stroke-dasharray", "4,4")
					.attr("class", section.id);
			} else {
				exist
					.attr("x2", Math.cos(angle) * this.dimensions.radius)
					.attr("y2", Math.sin(angle) * this.dimensions.radius)
					.attr("stroke", state.radarConfig.theme.colors.grid)
					.attr("stroke-width", state.radarConfig.theme.sizes.strokeWidth);
			}
		}
	}
}
