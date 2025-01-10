import type { RadarElementBase } from "$lib/radar/core/elements/radar.js";

export const updateOne = <T extends RadarElementBase>(
	items: T[],
	id: T["id"],
	update: Partial<T>,
) => {
	const index = items.findIndex((item) => item.id === id);

	const updated = [...items];
	const timestamp = Date.now();

	const current = items[index];
	updated[index] = {
		...items[index],
		...update,
		updated: timestamp,
		version: update.version || current.version + 1,
	};

	return updated;
};
