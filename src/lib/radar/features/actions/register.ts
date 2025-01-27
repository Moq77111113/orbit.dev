import type { AppMode } from "$lib/radar/state/types.js";
import { writeonly } from "./predicates.js";
import type { Action } from "./types/action.js";

export let actions: readonly Action[] = [];

export const register = <T extends Action>(
	_action: T,
	mode: AppMode = "read-write",
) => {
	let action = _action;
	if (mode === "read-write") {
		action = writeonly(action);
	}
	actions = [...actions, action];
	return action;
};
