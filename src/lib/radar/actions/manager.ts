import type { AppState } from "~/lib/radar/state/types.js";
import type { StateObserver } from "../state/observers/state-observer.js";
import type { ActionResult } from "./types/action-function.js";
import type { ActionName } from "./types/action-name.js";
import type { Action } from "./types/action.js";
export class ActionManager {
	// Public properties
	actions = new Map<ActionName, Action>();
	getState: () => AppState;

	#updater: (actionResult: ActionResult) => void;
	#observers: StateObserver[] = [];

	constructor(
		updater: (actionResult: ActionResult) => void,
		getState: () => AppState,
	) {
		this.#updater = updater;
		this.getState = getState;
	}

	addObserver(observer: StateObserver) {
		this.#observers.push(observer);
	}

	registerAction(action: Action) {
		this.actions.set(action.name, action);
	}

	registerActions(actions: readonly Action[]) {
		for (const action of actions) {
			this.registerAction(action);
		}
	}

	executeAction<T extends Action>(
		action: T,
		data: Parameters<T["perform"]>[2],
	) {
		const appState = this.getState();

		const result = action.perform(appState, data);
		if (result instanceof Promise) {
			return result.then((r) => {
				this.#updater(r);
				this.#notifyObservers(this.getState());
			});
		}

		this.#updater(result);
		this.#notifyObservers(this.getState());
	}

	#notifyObservers(state: AppState) {
		for (const observer of this.#observers) {
			observer.update(state);
		}
	}
}
