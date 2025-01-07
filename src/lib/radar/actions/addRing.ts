import { color } from "~/lib/utils/color.js";
import { randomId, randomInteger } from "~/lib/utils/random.js";
import type { Ring, RingElement } from "../elements/types.js";
import type { AppState } from "../state/types.js";
import { register } from "./register.js";
import type { ActionResult } from "./types/action-function.js";

type CreateRingData = Pick<Ring, "name" | "color">;

export const addRing = register({
	name: "ring/add",
	label: "Add Ring",
	keywords: ["ring", "add", "create"],
	perform: (state: AppState, data: CreateRingData): ActionResult => {
		const newRing: RingElement = {
			id: randomId("rng"),
			seed: randomInteger(),
			version: 1,
			isDeleted: false,
			updated: Date.now(),
			name: data.name,
			color: data.color ?? color(data.name),
			type: "ring",
		};

		return {
			appState: {
				radar: {
					...state.radar,
					rings: [...state.radar.rings, newRing],
				},
			},
		};
	},
});
