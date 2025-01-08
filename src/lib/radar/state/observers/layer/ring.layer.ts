import type * as d3 from "d3";
import type { Ring } from "~/lib/radar/elements/types.js";
import { Layer } from "./base.layer.js";

export class RingLayer extends Layer<Ring> {
	render(): void {
		this.layer.attr(
			"transform",
			`translate(${this.dimensions.width / 2}, ${this.dimensions.height / 2})`,
		);

		for (const [idx, ring] of this.data.entries()) {
			this.#createOrUpdateRing(ring, idx);
		}
	}

	#class(ring: Ring) {
		return `ring-${ring.id}` as const;
	}

	#pathId(ring: Ring) {
		return `ring-label-path-${ring.id}` as const;
	}

	#select<T extends d3.BaseType>(
		path: string,
	): d3.Selection<T, unknown, null, undefined>;
	#select<T extends SVGCircleElement>(
		ring: Ring,
		property: "class",
	): d3.Selection<T, unknown, null, undefined>;
	#select<T extends SVGPathElement>(
		ring: Ring,
		property: "pathId",
	): d3.Selection<T, unknown, null, undefined>;
	#select<T extends SVGPathElement>(
		path: string | Ring,
		property?: "class" | "pathId",
	): d3.Selection<T, unknown, null, undefined> {
		if (typeof path === "string") {
			return this.layer.select(path);
		}
		return this.layer.select(
			property === "class" ? `.${this.#class(path)}` : `#${this.#pathId(path)}`,
		);
	}

	#createOrUpdateRing(ring: Ring, idx: number) {
		const ringElement = this.#ringElement(ring);
		this.#updateRing(ringElement, idx);
	}

	#ringElement(ring: Ring) {
		const exist = this.#select(ring, "class");
		if (!exist.empty()) {
			return exist.datum(ring);
		}
		return this.layer
			.append("circle")
			.datum(ring)
			.attr("class", this.#class(ring));
	}

	#textElement(ring: Ring) {
		const exist = this.#select(ring, "pathId");
		if (!exist.empty()) {
			return exist.datum(ring);
		}
		return this.layer
			.append("defs")
			.append("path")
			.attr("id", this.#pathId(ring))
			.datum(ring);
	}

	#updateRing(
		circle: d3.Selection<SVGCircleElement, Ring, null, undefined>,
		idx: number,
	) {
		const ringWidth = this.dimensions.radius / this.data.length;
		const outerRadius = (idx + 1) * ringWidth;
		const innerRadius = idx * ringWidth;
		const ring = circle.datum();
		circle.transition().duration(500).attr("r", outerRadius);

		this.#styleRing(circle);

		if (this.config.showLabels) {
			const textRadius = innerRadius + ringWidth / 2;

			this.#textElement(ring).attr(
				"d",
				`M -${textRadius} 0 A ${textRadius} ${textRadius} 0 0 1 ${textRadius} 0`,
			);

			const text = this.layer.append("text").datum(ring);

			this.#styleText(text);
		}
	}

	#styleRing(circle: d3.Selection<SVGCircleElement, Ring, null, undefined>) {
		circle
			.attr("fill", "transparent")
			.attr("stroke", (r) => r.color)
			.attr("stroke-width", this.config.theme.sizes.strokeWidth)
			.attr("opacity", this.config.theme.opacity.rings);
	}

	#styleText(text: d3.Selection<SVGTextElement, Ring, null, undefined>) {
		text
			.style("fill", (r) => r.color)
			.style("font-size", `${this.config.theme.fontSizes.rings}px`)
			.style("opacity", this.config.theme.opacity.text)
			.style("font-weight", "bold")
			.style("pointer-events", "none")
			.append("textPath")
			.transition()
			.duration(500)
			.attr("href", (r) => `#${this.#pathId(r)}`)
			.attr("startOffset", "50%")
			.attr("text-anchor", "middle")
			.text((r) => r.name);
	}
}
