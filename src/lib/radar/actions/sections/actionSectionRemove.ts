import { register } from "$lib/radar/actions/register.js";
import type { ActionResult } from "$lib/radar/actions/types/action-function.js";
import type { Section } from "$lib/radar/elements/types.js";
import type { AppState } from "$lib/radar/state/types.js";

export const removeSection = register({
	name: "section/remove",
	label: "Remove Section",
	keywords: ["section", "remove", "delete"],
	perform: (state: AppState, data: Section["id"]): ActionResult => {
		const newSections = state.radar.sections.filter(
			(section) => section.id !== data,
		);

		return {
			appState: {
				radar: {
					...state.radar,
					sections: newSections,
				},
			},
		};
	},
});
