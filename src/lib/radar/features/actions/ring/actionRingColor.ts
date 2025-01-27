import type { Ring } from "$lib/radar/core/elements/types.js";
import { updateOne } from "$lib/radar/features/actions/common.js";
import { register } from "$lib/radar/features/actions/register.js";
import type { AppState } from "$lib/radar/state/types.js";

type ChangeRingColorData = Pick<Ring, "id" | "color">;

export const reColorRing = register({
	name: "ring/recolor",
	label: "Change Ring Color",
	keywords: ["ring", "update", "color"],
	perform: (state: AppState, data: ChangeRingColorData) => {
		const { color, id } = data;

		const rings = updateOne(state.radar.rings, id, { color });

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
