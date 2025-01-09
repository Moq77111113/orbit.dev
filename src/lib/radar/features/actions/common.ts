export const updateOne = <
	ID extends string,
	T extends { id: ID; updated: number },
>(
	items: T[],
	id: ID,
	update: Partial<T>,
) => {
	const index = items.findIndex((item) => item.id === id);

	const updated = [...items];
	const timestamp = Date.now();

	updated[index] = {
		...items[index],
		...update,
		updated: timestamp,
	};

	return updated;
};
