import type { Section } from "$lib/radar/core/elements/types.js";
import { register } from "$lib/radar/features/actions/register.js";
import type { ActionResult } from "$lib/radar/features/actions/types/action-function.js";
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
