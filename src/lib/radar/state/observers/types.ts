import type { AppState } from "$lib/radar/state/types.js";

export type StateObserver = {
	update: (data: AppState) => void;
};
