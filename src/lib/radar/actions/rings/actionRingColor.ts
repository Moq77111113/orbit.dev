import { updateOne } from "$lib/radar/actions/common.js";
import { register } from "$lib/radar/actions/register.js";
import type { Ring } from "$lib/radar/elements/types.js";
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
