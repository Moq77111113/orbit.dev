import { register } from "$lib/radar/features/actions/register.js";

import type { Entry, EntryElement } from "$lib/radar/core/elements/types.js";
import type { AppState } from "$lib/radar/state/types.js";
import { randomId, randomInteger } from "$lib/utils/random.js";

type CreateEntryData = Omit<Entry, "id">;

export const addEntry = register({
	name: "entry/add",
	label: "Add Entry",
	keywords: ["entry", "add", "create"],
	perform: (state: AppState, data: CreateEntryData) => {
		const newEntry: EntryElement = {
			id: randomId("ent"),
			seed: randomInteger(),
			version: 1,
			isDeleted: false,
			updated: Date.now(),
			...data,
			type: "entry",
		};

		return {
			appState: {
				radar: {
					...state.radar,
					entries: [...state.radar.entries, newEntry],
				},
			},
		};
	},
});
