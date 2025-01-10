import type {
	DistributedPlacementOptions,
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

export function Distributed(
	context: EntryPlacementContext,
	options: DistributedPlacementOptions,
) {
	if (!context.section) return { x: 0, y: 0 };

	const { startAngle, endAngle, maxRadius, minRadius, entry, rate } = context;
	const { jitter = 0.2 } = options;

	const random = seededRandom(entry.id);

	const sectionAngle = endAngle - startAngle;
	const baseAngle = startAngle + sectionAngle * rate;

	const angleJitter = (random() - 0.5) * sectionAngle * jitter;
	const angle = baseAngle + angleJitter;

	const radiusRange = maxRadius - minRadius;
	const baseRadius = minRadius + radiusRange * 0.5;
	const radiusJitter = (random(Math.PI) - 0.5) * radiusRange * jitter;
	const radius = baseRadius + radiusJitter;

	return {
		x: radius * Math.cos(angle),
		y: radius * Math.sin(angle),
	};
}
