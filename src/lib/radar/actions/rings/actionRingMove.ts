import { register } from "$lib/radar/actions/register.js";
import type { Ring } from "$lib/radar/elements/types.js";
import type { AppState } from "$lib/radar/state/types.js";

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
	perform: (state: AppState, data: MoveRingData) => {
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
