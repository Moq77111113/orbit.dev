import { color } from "~/lib/utils/color.js";
import { randomId, randomInteger } from "~/lib/utils/random.js";
import type { Ring, RingElement } from "../../elements/types.js";
import type { AppState } from "../../state/types.js";
import { register } from "../register.js";
import type { ActionResult } from "../types/action-function.js";

type MoveRingData = Pick<Ring, "id"> & { direction: "up" | "down" };

const isValidMove = (
	currentIndex: number,
	newIndex: number,
	totalRings: number,
) => {
	return currentIndex !== -1 && newIndex >= 0 && newIndex < totalRings;
};

export const moveRing = register({
	name: "ring/move",
	label: "Move Ring",
	keywords: ["ring", "update", "move"],
	perform: (state: AppState, data: MoveRingData): ActionResult => {
		const { direction, id } = data;
		const rings = state.radar.rings;
		const ringIndex = rings.findIndex((ring) => ring.id === id);

		const newIndex = ringIndex + (direction === "up" ? -1 : 1);

		if (!isValidMove(ringIndex, newIndex, rings.length)) {
			return false;
		}

		const updatedRings = [...rings];
		const timestamp = Date.now();

		updatedRings[ringIndex] = { ...rings[newIndex], updated: timestamp };
		updatedRings[newIndex] = { ...rings[ringIndex], updated: timestamp };

		return {
			appState: {
				radar: {
					...state.radar,
					rings: updatedRings,
				},
			},
		};
	},
});
