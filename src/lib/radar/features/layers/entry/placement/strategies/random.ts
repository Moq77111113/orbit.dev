import type {
	EntryPlacementContext,
	RandomPlacementOptions,
} from "../types.js";

function seededRandom(seed: string) {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = (hash << 5) - hash + seed.charCodeAt(i);
		hash = hash & hash;
	}
	return () => {
		const x = Math.sin(hash++) * 10000;
		return x - Math.floor(x);
	};
}

function seededRandom2(seed: number, offset = 0) {
	return Math.abs(Math.sin(seed + offset)) % 1;
}
export function Random(
	context: EntryPlacementContext,
	_options: RandomPlacementOptions,
) {
	const { minRadius, maxRadius, endAngle, startAngle, entry } = context;

	if (!context.section) return { x: 0, y: 0 };
	const random = seededRandom(entry.id);
	const angle = startAngle + random() * (endAngle - startAngle);

	const r = minRadius + random() * (maxRadius - minRadius);

	return {
		x: r * Math.cos(angle),
		y: r * Math.sin(angle),
	};
}
