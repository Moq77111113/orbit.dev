import type {
	ClusteredPlacementOptions,
	EntryPlacementContext,
} from "./types.js";

export function Clustered(
	context: EntryPlacementContext,
	options: ClusteredPlacementOptions,
) {
	const { minRadius, maxRadius, endAngle, startAngle } = context;
	const { clustersCount = 3 } = options;

	const clusterIdx = Math.floor(Math.random() * clustersCount);
	const angleStep = (endAngle - startAngle) / clustersCount;

	const baseAngle = startAngle + angleStep * clusterIdx + angleStep * 0.5;

	const angleJitter = (Math.random() - 0.5) * angleStep;
	const angle = baseAngle + angleJitter;

	const radiusRange = maxRadius - minRadius;
	const baseRadius = minRadius + radiusRange * 0.5;
	const radiusJitter = (Math.random() - 0.5) * radiusRange;
	const r = baseRadius + radiusJitter;

	return {
		x: r * Math.cos(angle),
		y: r * Math.sin(angle),
	};
}
