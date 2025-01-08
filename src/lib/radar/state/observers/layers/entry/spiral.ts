import type { EntryPlacementContext, SpiralPlacementOptions } from "./types.js";

export function Spiral(
	context: EntryPlacementContext,
	options: SpiralPlacementOptions,
) {
	if (!context.section) return { x: 0, y: 0 };

	const { startAngle, endAngle, minRadius, maxRadius } = context;
	const { spiralStep = 0.1 } = options;

	const goldenAngle = Math.PI * (3 - Math.sqrt(5));

	const sectionAngle = endAngle - startAngle;
	const t = Math.random();

	const radiusRange = maxRadius - minRadius;
	const radius = minRadius + radiusRange * t;

	const rotations = Math.floor(radiusRange / spiralStep);
	const angle = startAngle + sectionAngle * t + goldenAngle * rotations * t;

	const rJitter = (Math.random() - 0.5) * radiusRange;
	const aJitter = (Math.random() - 0.5) * sectionAngle;

	return {
		x: (radius + rJitter) * Math.cos(angle + aJitter),
		y: (radius + rJitter) * Math.sin(angle + aJitter),
	};
}
