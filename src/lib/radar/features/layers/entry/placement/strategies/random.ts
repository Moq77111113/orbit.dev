import type {
	EntryPlacementContext,
	RandomPlacementOptions,
} from "../types.js";

export function Random(
	context: EntryPlacementContext,
	_options: RandomPlacementOptions,
) {
	const { minRadius, maxRadius, endAngle, startAngle } = context;
	
	if (!context.section) return { x: 0, y: 0 };

	const angle = startAngle + Math.random() * (endAngle - startAngle);

	const r = minRadius + Math.random() * (maxRadius - minRadius);

	return {
		x: r * Math.cos(angle),
		y: r * Math.sin(angle),
	};
}
