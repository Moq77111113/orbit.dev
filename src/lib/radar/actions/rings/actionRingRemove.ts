import type { Ring } from "../../elements/types.js";
import type { AppState } from "../../state/types.js";
import { register } from "../register.js";
import type { ActionResult } from "../types/action-function.js";

export const removeRing = register({
	name: "ring/remove",
	label: "Remove Ring",
	keywords: ["ring", "remove", "delete"],
	perform: (state: AppState, data: Ring["id"]): ActionResult => {
		const newRings = state.radar.rings.filter((ring) => ring.id !== data);

		return {
			appState: {
				radar: {
					...state.radar,
					rings: newRings,
				},
			},
		};
	},
});
