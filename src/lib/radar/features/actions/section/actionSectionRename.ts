import type { Section } from "$lib/radar/core/elements/types.js";
import { updateOne } from "$lib/radar/features/actions/common.js";
import { register } from "$lib/radar/features/actions/register.js";
import type { ActionResult } from "$lib/radar/features/actions/types/action-function.js";
import type { AppState } from "$lib/radar/state/types.js";

type RenameSectionData = Pick<Section, "id" | "name">;

export const renameSection = register({
	name: "section/rename",
	label: "Add Section",
	keywords: ["section", "update", "name", "label"],
	perform: (state: AppState, data: RenameSectionData): ActionResult => {
		const { name, id } = data;

		const sections = updateOne(state.radar.sections, id, { name });
		return {
			appState: {
				radar: {
					...state.radar,
					sections,
				},
			},
		};
	},
});
