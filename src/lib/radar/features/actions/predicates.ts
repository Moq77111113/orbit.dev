import type { AppState } from "$lib/radar/state/types.js";
import type { Action } from "./types/action.js";

export const writeonly = <T extends Omit<Action, "predicate">>(
	action: T,
): T & { predicate: NonNullable<Action["predicate"]> } => {
	return {
		...action,
		predicate: (state: AppState) => state.mode === "read-write",
	};
};
