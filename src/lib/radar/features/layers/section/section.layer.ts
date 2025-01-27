import type { Section } from "$lib/radar/core/elements/types.js";
import { Layer } from "../base/base.layer.js";
import type { D3Selection } from "../base/types.js";

type Selection = D3Selection<SVGLineElement, Section>;
export class SectionLayer extends Layer<Section, SVGLineElement> {
	protected compare(a: Section, b: Section): boolean {
		return a.id === b.id;
	}

	protected getOne(data: Section) {
		const selected = this.#select(data);
		if (selected.empty()) {
			return null;
		}

		return selected.datum(data);
	}
	protected getOrCreate(section: Section) {
		return (
			this.getOne(section) ??
			this.layer
				.append("line")
				.datum(section)
				.attr("class", this.#class(section))
		);
	}

	protected applyAttributes(line: Selection, idx: number) {
		const angle = ((2 * Math.PI) / this.data.length) * idx;
		line
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", Math.cos(angle) * this.dimensions.radius)
			.attr("y2", Math.sin(angle) * this.dimensions.radius)
			.transition()
			.duration(500)
			.attr("fill", "transparent")
			.attr("stroke", this.config.theme.colors.grid)
			.attr("stroke-width", this.config.theme.sizes.strokeWidth)
			.attr("stroke-dasharray", "4,4");
	}

	#class(section: Section) {
		return `section-${section.id}` as const;
	}

	#select(section: Section) {
		return this.layer.select<SVGLineElement>(`.${this.#class(section)}`);
	}
}
