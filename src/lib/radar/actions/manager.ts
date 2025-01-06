import type { AppState } from "~/types/app.js";
import type { ActionResult } from "./types/action-function.js";
import type { ActionName } from "./types/action-name.js";
import type { Action } from "./types/action.js";

export class ActionManager {
	actions = new Map<ActionName, Action>();

	#updater: (actionResult: ActionResult | Promise<ActionResult>) => void;

	getState: () => AppState;

	constructor(
		updater: (actionResult: ActionResult) => void,
		getState: () => AppState,
	) {
		this.#updater = (result) => {
			if (result instanceof Promise) {
				return result.then((r) => updater(r));
			}
			return updater(result);
		};
		this.getState = getState;
	}

	register(action: Action) {
		this.actions.set(action.name, action);
	}

	registerActions(actions: readonly Action[]) {
		for (const action of actions) {
			this.register(action);
		}
	}

	executeAction<T extends Action>(
		action: T,
		elements: Parameters<T["perform"]>[0],
		value: Parameters<T["perform"]>[2],
	) {
		const appState = this.getState();

		this.#updater(action.perform(elements, appState, value));
	}
}
