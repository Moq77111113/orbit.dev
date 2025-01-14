export function color(label?: string): string {
	let hash = 0;

	const cleaned = label
		? label.toLowerCase().trim()
		: Math.random().toString(36).substring(7);

	for (let i = 0; i < cleaned.length; i++) {
		hash = cleaned.charCodeAt(i) + ((hash << 5) - hash);
	}

	const hue = Math.abs(hash % 360);
	const saturation = 90 + (hash % 10);
	const lightness = 50 + (hash % 10);
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
