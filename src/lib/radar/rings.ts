import type { DrawOptions, Target } from "~/types/radar.js";
import { defaultConfig } from "../theme.js";

export function drawRings(target: Target, options: DrawOptions) {
	const { geometry, radar } = options;
	const { rings, config = defaultConfig } = radar;
	const { radius } = geometry;
	const ringWidth = radius / rings.length;

	const defs = target.append("defs");
	for (const [i, ring] of rings.entries()) {
		const outerRadius = (i + 1) * ringWidth;
		const innerRadius = i * ringWidth;

		const textRadius = innerRadius + ringWidth / 2;

		target
			.append("circle")
			.attr("r", outerRadius)
			.attr("fill", "none")
			.attr("stroke", config.theme.colors.grid)
			.attr("stroke-dasharray", "4,4")
			.attr("stroke-width", config.theme.sizes.strokeWidth);

		const pathId = `ring-label-path-${i}`;
		defs
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
}
