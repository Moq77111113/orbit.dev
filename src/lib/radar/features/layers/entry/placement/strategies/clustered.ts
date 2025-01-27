import type {
	ClusteredPlacementOptions,
	EntryPlacementContext,
} from "../types.js";

function seededRandom(seed: string) {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = (hash << 5) - hash + seed.charCodeAt(i);
		hash = hash & hash;
	}
	return (offset = 0) => {
		const x = Math.sin(hash + offset) * 10000;
		return x - Math.floor(x);
	};
}
export function Clustered(
	context: EntryPlacementContext,
	options: ClusteredPlacementOptions,
) {
	const { minRadius, maxRadius, endAngle, startAngle, rate, entry } = context;
	const { clustersCount = 1, spread = 0.2 } = options;

	const random = seededRandom(entry.id);

	const clusterIdx = Math.floor(random() * clustersCount);
	const angleStep = (endAngle - startAngle) / clustersCount;

	const clusterAngle = startAngle + angleStep * clusterIdx + angleStep * 0.5;

	const radiusRange = maxRadius - minRadius;
	const baseRadius = minRadius + radiusRange * 0.3 + radiusRange * 0.4 * rate;

	const angleJitter = (random(Math.PI) - 0.5) * angleStep * spread;
	const radiusJitter = random(Math.PI * 2) * radiusRange * 0.05;

	const angle = clusterAngle + angleJitter;
	const radius = baseRadius + radiusJitter;

	return {
		x: radius * Math.cos(angle),
		y: radius * Math.sin(angle),
	};
}
