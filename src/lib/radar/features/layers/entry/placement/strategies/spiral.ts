import type {
	EntryPlacementContext,
	SpiralPlacementOptions,
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

export function Spiral(
	context: EntryPlacementContext,
	options: SpiralPlacementOptions,
) {
	if (!context.section) return { x: 0, y: 0 };

	const { startAngle, endAngle, minRadius, maxRadius, entry, rate } = context;
	const { spiralStep = 0.1, jitter = 0.05 } = options;
	const random = seededRandom(entry.id);

	const sectionAngle = endAngle - startAngle;
	const rotations = (2 * Math.PI * (maxRadius - minRadius)) / spiralStep;

	const t = rate;


	const theta = startAngle + rotations * t * sectionAngle;
	const radius = minRadius + (spiralStep * theta) / (2 * Math.PI);


	const rJitter = (random() - 0.5) * spiralStep * jitter;
	const aJitter = (random(Math.PI) - 0.5) * 0.1 * jitter;

	return {
		x: (radius + rJitter) * Math.cos(theta + aJitter),
		y: (radius + rJitter) * Math.sin(theta + aJitter),
	};
}
