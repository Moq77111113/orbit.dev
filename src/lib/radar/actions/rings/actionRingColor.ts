import type { Ring } from "../../elements/types.js";
import type { AppState } from "../../state/types.js";
import { updateOne } from "../common.js";
import { register } from "../register.js";
import type { ActionResult } from "../types/action-function.js";

type ChangeRingColorData = Pick<Ring, "id" | "color">;

export const reColorRing = register({
	name: "ring/recolor",
	label: "Change Ring Color",
	keywords: ["ring", "update", "color"],
	perform: (state: AppState, data: ChangeRingColorData): ActionResult => {
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
