import { register } from "$lib/radar/actions/register.js";

import type { Entry } from "$lib/radar/elements/types.js";
import type { AppState } from "$lib/radar/state/types.js";
import type { Merge } from "~/types/utils.js";
import { updateOne } from "../common.js";

type UpdateEntryData = Merge<Partial<Entry>, Pick<Entry, "id">>;

export const updateEntry = register({
	name: "entry/add",
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
