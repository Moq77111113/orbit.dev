import type { Action } from "./types/action.js";

export let actions: readonly Action[] = [];

export const register = <T extends Action>(action: T) => {
	actions = [...actions, action];
	return action;
};
