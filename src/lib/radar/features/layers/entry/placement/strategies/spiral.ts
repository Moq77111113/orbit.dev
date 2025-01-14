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

	const random = seededRandom(context.entry.id);
	const { startAngle, endAngle, minRadius, maxRadius, rate } = context;
	const { spiralStep = 0.1, jitter = 0.05 } = options;

	const sectionAngle = endAngle - startAngle;
	const sectionCenter = startAngle + sectionAngle / 2;
	const rotations = 2;
	const t = rate;
	const angle = sectionCenter + t * rotations * sectionAngle - sectionAngle / 2;

	const radius = minRadius + t * (maxRadius - minRadius);
	const rJitter = (random() - 0.5) * spiralStep * jitter;
	const aJitter = (random(Math.PI) - 0.5) * sectionAngle * jitter;

	return {
		x: (radius + rJitter) * Math.cos(angle + aJitter),
		y: (radius + rJitter) * Math.sin(angle + aJitter),
	};
}
