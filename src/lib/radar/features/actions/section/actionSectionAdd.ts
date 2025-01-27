import type {
	Section,
	SectionElement,
} from "$lib/radar/core/elements/types.js";
import { register } from "$lib/radar/features/actions/register.js";
import type { ActionResult } from "$lib/radar/features/actions/types/action-function.js";
import type { AppState } from "$lib/radar/state/types.js";
import { randomId, randomInteger } from "$lib/utils/random.js";

type CreateSectionData = Pick<Section, "name">;

export const addSection = register({
	name: "section/add",
	label: "Add Section",
	keywords: ["section", "add", "create"],
	perform: (state: AppState, data: CreateSectionData): ActionResult => {
		const newSection: SectionElement = {
			id: randomId("sec"),
			seed: randomInteger(),
			version: 1,
			isDeleted: false,
			updated: Date.now(),
			name: data.name,
			type: "section",
		};

		return {
			appState: {
				radar: {
					...state.radar,
					sections: [...state.radar.sections, newSection],
				},
			},
		};
	},
});
