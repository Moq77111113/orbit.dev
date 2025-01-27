import type { Ring } from "$lib/radar/core/elements/types.js";
import type * as d3 from "d3";
import { Layer } from "../base/base.layer.js";
import type { D3Selection } from "../base/types.js";

type Selection = D3Selection<SVGGElement, Ring>;
type Circle = D3Selection<SVGCircleElement, Ring>;
export class RingLayer extends Layer<Ring, SVGGElement> {
	protected compare(a: Ring, b: Ring) {
		return a.id === b.id;
	}
	protected getOne(data: Ring) {
		const selected = this.#select(data, "group");
		if (selected.empty()) {
			return null;
		}

		return selected.datum(data);
	}
	protected getOrCreate(ring: Ring) {
		return (
			this.getOne(ring) ??
			this.layer
				.append("g")
				.datum(ring)
				.attr("class", this.#groupSelector(ring))
		);
	}

	protected applyAttributes(group: Selection, idx: number) {
		const ringWidth = this.dimensions.radius / this.data.length;
		const outerRadius = (idx + 1) * ringWidth;

		const ring = group.datum();

		const circle = this.#circle(ring);
		circle
			.attr("r", outerRadius)
			.attr("fill", "transparent")
			.attr("stroke", (r) => r.color)
			.attr("stroke-width", this.config.theme.sizes.strokeWidth)
			.attr("opacity", this.config.theme.opacity.rings);

		if (this.config.showLabels) {
			this.#text(ring);
		}
	}

	protected removeOne(data: Ring) {
		const group = this.#select(data, "group");

		if (!group.empty()) {
			group.remove();
		}
	}

	#circle(ring: Ring): Circle {
		const exist = this.#select<SVGCircleElement>(ring, "circle");
		if (!exist.empty()) {
			return exist.datum(ring);
		}

		const group = this.getOrCreate(ring);
		return group
			.append("circle")
			.datum(ring)
			.attr("class", this.#circleSelector(ring));
	}

	#text(ring: Ring) {
		const ringWidth = this.dimensions.radius / this.data.length;
		const ringIdx = this.data.findIndex((r) => r.id === ring.id);

		const innerRadius = ringIdx * ringWidth;

		const textRadius = innerRadius + ringWidth / 2;

		this.#getOrCreateText(ring).attr(
			"d",
			`M -${textRadius} 0 A ${textRadius} ${textRadius} 0 0 1 ${textRadius} 0`,
		);

		const ringElement = this.getOrCreate(ring);

		let text = ringElement.select<SVGTextElement>("text");
		if (text.empty()) {
			text = ringElement.append("text");
		}

		text
			.datum(ring)
			.style("fill", (r) => r.color)
			.style("font-size", `${this.config.theme.fontSizes.rings}px`)
			.style("opacity", this.config.theme.opacity.text)
			.style("font-weight", "bold")
			.style("pointer-events", "none");

		let textPath = text.select<SVGTextPathElement>("textPath");
		if (textPath.empty()) {
			textPath = text.append("textPath");
		}
		textPath
			.transition()
			.duration(500)
			.attr("href", (r) => `#${this.#pathSelector(r)}`)
			.attr("startOffset", "50%")
			.attr("text-anchor", "middle")
			.text((r) => r.name);
	}

	#getOrCreateText(ring: Ring) {
		const exist = this.#select(ring, "pathId");
		if (!exist.empty()) {
			return exist.datum(ring);
		}

		return this.getOrCreate(ring)
			.append("defs")
			.append("path")
			.attr("id", this.#pathSelector(ring))
			.datum(ring);
	}

	#groupSelector(ring: Ring) {
		return `ring-group-${ring.id}` as const;
	}
	#circleSelector(ring: Ring) {
		return `ring-${ring.id}` as const;
	}
	#pathSelector(ring: Ring) {
		return `ring-label-path-${ring.id}` as const;
	}

	#select<T extends d3.BaseType>(
		path: string,
	): d3.Selection<T, unknown, null, undefined>;
	#select<T extends SVGCircleElement>(
		ring: Ring,
		property: "circle",
	): d3.Selection<T, unknown, null, undefined>;
	#select<T extends SVGPathElement>(
		ring: Ring,
		property: "pathId",
	): d3.Selection<T, unknown, null, undefined>;
	#select<T extends SVGGElement>(
		ring: Ring,
		property: "group",
	): d3.Selection<T, unknown, null, undefined>;
	#select<T extends d3.BaseType>(
		first: string | Ring,
		property?: "circle" | "pathId" | "group",
	): d3.Selection<T, unknown, null, undefined> {
		if (typeof first === "string") {
			return this.layer.select(first);
		}

		const selector = {
			circle: (ring: Ring) => `.${this.#circleSelector(ring)}`,
			pathId: (ring: Ring) => `#${this.#pathSelector(ring)}`,
			group: (ring: Ring) => `.${this.#groupSelector(ring)}`,
		}[property ?? "group"](first);

		return this.layer.select(selector);
	}
}
