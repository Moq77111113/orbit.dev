import { nanoid } from "nanoid";

function* seededRandomGenerator() {
	let seed = 5489;

	while (true) {
		seed = (seed * 9301 + 49297) % 233280;
		const random = seed / 233280;
		yield Math.floor(random * Number.MAX_SAFE_INTEGER);
	}
}

const random = seededRandomGenerator();

export const randomInteger = () => random.next().value as number;

export function randomId<T extends string = "">(
	pre?: T,
): T extends "" ? string : `${T}-${string}` {
	const prefix = pre ? `${pre}-` : "";
	return `${prefix}${nanoid()}` as T extends "" ? string : `${T}-${string}`;
}
