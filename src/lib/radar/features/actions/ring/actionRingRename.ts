import { updateOne } from "$lib/radar/features/actions/common.js";
import { register } from "$lib/radar/features/actions/register.js";

import type { Ring } from "$lib/radar/core/elements/types.js";
import type { AppState } from "$lib/radar/state/types.js";

type RenameRingData = Pick<Ring, "id" | "name">;

export const renameRing = register({
	name: "ring/rename",
	label: "Rename",
	keywords: ["ring", "update", "name", "label"],
	perform: (state: AppState, data: RenameRingData) => {
		const { name, id } = data;

		const rings = updateOne(state.radar.rings, id, { name });

		return {
			appState: {
				radar: {
					...state.radar,
					rings,
				},
			},
		};
	},
});
