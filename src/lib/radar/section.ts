import type { DrawOptions, Target } from "~/types/radar.js";
import { defaultConfig } from "../theme.js";

export function drawSections(target: Target, options: DrawOptions) {
	const { radar, geometry } = options;
	const { sections, config = defaultConfig } = radar;
	const { radius } = geometry;
	for (const [i] of sections.entries()) {
		const angle = ((2 * Math.PI) / sections.length) * i;
		target
			.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", Math.cos(angle) * radius)
			.attr("y2", Math.sin(angle) * radius)
			.attr("stroke", config.theme.colors.grid)
			.attr("stroke-width", config.theme.sizes.strokeWidth)
			.attr("stroke-dasharray", "4,4");
	}
}
