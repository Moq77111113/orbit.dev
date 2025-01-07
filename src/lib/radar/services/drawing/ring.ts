import { color } from "$lib/utils/color.js";
import type { Target } from "~/types/radar-options.js";
import type { Ring } from "~/types/radar.js";
import { DrawService } from "./base.js";

type RingOptions = {
	ring: Ring;
	ringIdx?: number;
};

export class RingService extends DrawService {
	addRing(target: Target, options: RingOptions) {
		const { ring, ringIdx = this.radar.rings.length } = options;

		const { radius } = this.radar.geometry;
		const config = this.radar.config;
		const ringWidth = radius / this.radar.rings.length;

		const outerRadius = (ringIdx + 1) * ringWidth;
		const innerRadius = ringIdx * ringWidth;
		const textRadius = innerRadius + ringWidth / 2;

		target
			.append("circle")
			.attr("r", outerRadius)
			.attr("fill", "transparent")
			.attr("stroke", ring.color ?? color(ring.name))
			.attr("stroke-width", config.theme.sizes.strokeWidth)
			.attr("opacity", config.theme.opacity.rings);

		const pathId = `ring-label-path-${ring.id}`;
		target
			.append("defs")
			.append("path")
			.attr("id", pathId)
			.attr(
				"d",
				`M -${textRadius} 0 A ${textRadius} ${textRadius} 0 0 1 ${textRadius} 0`,
			);

		if (config.showLabels) {
			target
				.append("text")
				.style("fill", ring.color ?? config.theme.colors.text)
				.style("font-size", `${config.theme.fontSizes.rings}px`)
				.style("opacity", config.theme.opacity.text)
				.style("font-weight", "bold")
				.style("pointer-events", "none")
				.append("textPath")
				.attr("href", `#${pathId}`)
				.attr("startOffset", "50%")
				.attr("text-anchor", "middle")

				.text(ring.name);
		}
	}

	draw(target: Target) {
		for (const [id, ring] of this.radar.rings.entries()) {
			this.addRing(target, { ring, ringIdx: id });
		}
	}
}
