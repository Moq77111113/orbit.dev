import type {
	DistributedPlacementOptions,
	EntryPlacementContext,
} from "../types.js";

export function Distributed(
	context: EntryPlacementContext,
	options: DistributedPlacementOptions,
) {
	if (!context.section) return { x: 0, y: 0 };
	const { startAngle, endAngle, maxRadius, minRadius } = context;
	const jitter = options.jitter ?? 0.2;

	const sectionAngle = endAngle - startAngle;
	const baseAngle = startAngle + sectionAngle / 2;

	const angleJitter = (Math.random() - 0.5) * sectionAngle * jitter;
	const angle = baseAngle + angleJitter;

	const radiusRange = maxRadius - minRadius;
	const baseRadius = minRadius + radiusRange * 0.5;
	const radiusJitter = (Math.random() - 0.5) * radiusRange * jitter;
	const r = baseRadius + radiusJitter;

	return {
		x: r * Math.cos(angle),
		y: r * Math.sin(angle),
	};
}
