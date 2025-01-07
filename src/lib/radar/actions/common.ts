export const updateOne = <
	ID extends string,
	T extends { id: ID; updated: number },
>(
	items: T[],
	id: ID,
	update: Partial<T>,
) => {
	const ringIndex = items.findIndex((item) => item.id === id);

	const updated = [...items];
	const timestamp = Date.now();

	updated[ringIndex] = {
		...items[ringIndex],
		...update,
		updated: timestamp,
	};

	return updated;
};
