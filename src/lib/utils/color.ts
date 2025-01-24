import { randomPercentage } from "./random.js";

export function color(label?: string): string {
	let hash = 0;

	const cleaned = label
		? label.toLowerCase().trim()
		: randomPercentage().toString(36).substring(7);

	for (let i = 0; i < cleaned.length; i++) {
		hash = cleaned.charCodeAt(i) + ((hash << 5) - hash);
	}

	return `#${((hash & 0x00ffffff) | 0x1000000).toString(16).slice(1)}`;
}
