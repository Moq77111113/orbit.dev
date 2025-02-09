import type { AppState } from "$lib/radar/state/types.js";
import type { ActionPerform, ActionPredicate } from "./action-function.js";
import type { ActionName } from "./action-name.js";

export interface Action {
	name: ActionName;
	label: string;
	key?: (e: KeyboardEvent, state: AppState) => boolean;
	keywords?: string[];
	perform: ActionPerform;
	predicate?: ActionPredicate;
}
