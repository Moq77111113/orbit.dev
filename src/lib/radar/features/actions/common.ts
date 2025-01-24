import type { RadarElementBase } from "$lib/radar/core/elements/types.js";

export const updateOne = <T extends RadarElementBase>(
	items: T[],
	id: T["id"],
	update: Partial<T>,
) => {
	const index = items.findIndex((item) => item.id === id);

	const updated = [...items];
	const timestamp = Date.now();

	const current = items[index];
	const version =
		update.version && update.version !== current.version
			? update.version
			: current.version + 1;
			
	updated[index] = {
		...items[index],
		...update,
		updated: timestamp,
		version,
	};

	return updated;
};
