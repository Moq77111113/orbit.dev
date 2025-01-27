import type { Ring } from "$lib/radar/core/elements/types.js";
import { register } from "$lib/radar/features/actions/register.js";
import type { AppState } from "$lib/radar/state/types.js";

export const removeRing = register({
	name: "ring/remove",
	label: "Remove Ring",
	keywords: ["ring", "remove", "delete"],
	perform: (state: AppState, data: Ring["id"]) => {
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
