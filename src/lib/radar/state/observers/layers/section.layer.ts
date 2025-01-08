import type { Section } from "~/lib/radar/elements/types.js";
import { Layer } from "./base.layer.js";
import type { D3Selection } from "./types.js";

type Selection = D3Selection<SVGLineElement, Section>;
export class SectionLayer extends Layer<Section, SVGLineElement> {
	protected getOrCreate(section: Section) {
		const exist = this.#select(section);
		if (!exist.empty()) {
			return exist.datum(section);
		}
		return this.layer
			.append("line")
			.datum(section)
			.attr("class", this.#class(section));
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
