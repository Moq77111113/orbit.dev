import type * as d3 from "d3";
import type { Section } from "~/lib/radar/elements/types.js";
import { Layer } from "./base.layer.js";

type d3SectionElement = d3.Selection<SVGLineElement, Section, null, undefined>;
export class SectionLayer extends Layer<Section> {
	render(): void {
		this.layer.attr(
			"transform",
			`translate(${this.dimensions.width / 2}, ${this.dimensions.height / 2})`,
		);

		for (const [idx, section] of this.data.entries()) {
			this.#createOrUpdateSection(section, idx);
		}
	}

	#class(section: Section) {
		return `section-${section.id}` as const;
	}

	#select<T extends SVGLineElement>(
		section: Section,
	): d3.Selection<T, unknown, null, undefined> {
		return this.layer.select(`.${this.#class(section)}`);
	}

	#createOrUpdateSection(section: Section, idx: number) {
		const sectionElement = this.#sectionElement(section);
		this.#updateSection(sectionElement, idx);
	}

	#sectionElement(section: Section) {
		const exist = this.#select(section);
		if (!exist.empty()) {
			return exist.datum(section);
		}
		return this.layer
			.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.datum(section)
			.attr("class", this.#class(section));
	}

	#updateSection(line: d3SectionElement, idx: number) {
		const angle = ((2 * Math.PI) / this.data.length) * idx;
		line
			.attr("x2", Math.cos(angle) * this.dimensions.radius)
			.attr("y2", Math.sin(angle) * this.dimensions.radius)
			.transition()
			.duration(500);

		this.#styleSection(line);
	}

	#styleSection(line: d3SectionElement) {
		line
			.attr("fill", "transparent")
			.attr("stroke", this.config.theme.colors.grid)
			.attr("stroke-width", this.config.theme.sizes.strokeWidth)
			.attr("stroke-dasharray", "4,4");
	}
}
