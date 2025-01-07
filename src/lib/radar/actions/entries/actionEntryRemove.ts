import { register } from "$lib/radar/actions/register.js";
import type { Entry } from "$lib/radar/elements/types.js";
import type { AppState } from "$lib/radar/state/types.js";

export const removeEntry = register({
	name: "entry/remove",
	label: "Remove Entry",
	keywords: ["entry", "remove", "delete"],
	perform: (state: AppState, data: Entry["id"]) => {
		const newEntries = state.radar.entries.filter((entry) => entry.id !== data);

		return {
			appState: {
				radar: {
					...state.radar,
					entries: newEntries,
				},
			},
		};
	},
});
