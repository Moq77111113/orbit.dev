import { register } from "$lib/radar/features/actions/register.js";

import type { Entry } from "$lib/radar/core/elements/types.js";
import type { AppState } from "$lib/radar/state/types.js";

import type { Merge } from "$lib/types/utils.js";
import { updateOne } from "../common.js";

type UpdateEntryData = Merge<Partial<Entry>, Pick<Entry, "id">>;

export const updateEntry = register({
	name: "entry/update",
	label: "Update Entry",
	keywords: ["entry", "update"],
	perform: (state: AppState, data: UpdateEntryData) => {
		const entries = updateOne(state.radar.entries, data.id, { ...data });

		return {
			appState: {
				radar: {
					...state.radar,
					entries,
				},
			},
		};
	},
});
