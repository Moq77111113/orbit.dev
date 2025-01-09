import type { RadarConfig } from "$lib/radar/core/config/types.js";
import { ActionManager } from "$lib/radar/features/actions/manager.js";
import { actions } from "$lib/radar/features/actions/register.js";
import type {
	Action,
	ActionResult,
} from "$lib/radar/features/actions/types/index.js";
import type { AppState } from "$lib/radar/state/types.js";
import { getContext, setContext } from "svelte";

import { initRadar } from "$lib/radar/core/elements/init.js";
import type { Radar } from "$lib/radar/core/elements/radar.js";
import type { StateObserver } from "$lib/radar/state/observers/types.js";
import { getDefaultState } from "./default.js";

type Props = {
	app: string;
	radar?: Radar;
	config?: RadarConfig;
};

export class RadarState {
	#defaultState = getDefaultState();

	#state: AppState = $state<AppState>({
		...this.#defaultState,
		radar: initRadar(),
	});

	#actionManager: ActionManager;

	get state() {
		return this.#state;
	}

	private doUpdate(actionResult: ActionResult) {
		if (!actionResult) return;

		// TODO: Impl storage

		const radar =
			actionResult.appState?.radar || this.#state.radar || this.props.radar;
		const radarConfig =
			actionResult.appState?.radarConfig ||
			this.#state.radarConfig ||
			this.props.config;
		const errors = actionResult.appState?.errors || this.state.errors;
		this.#state = {
			...this.#state,
			...actionResult.appState,
			radar,
			radarConfig,
			errors,
		};
	}

	constructor(public readonly props: Props) {
		this.#state = {
			...this.#defaultState,
			radar: {
				...this.props.radar,
				...this.#state.radar,
			},
			radarConfig: {
				...this.#defaultState.radarConfig,
				...props.config,
			},
		};

		this.#actionManager = new ActionManager(
			this.doUpdate.bind(this),
			() => this.state,
		);

		this.#actionManager.registerActions(actions);
	}

	execute<T extends Action>(action: T, data: Parameters<T["perform"]>[1]) {
		this.#actionManager.executeAction(action, data);
	}

	addObserver(observer: StateObserver) {
		this.#actionManager.addObserver(observer);
		observer.update(this.state);
	}
}

const SYMBOL_KEY = "orb-radar";

export function createRadarState(props: Props) {
	return setContext(Symbol.for(SYMBOL_KEY), new RadarState(props));
}

export function useRadar() {
	return getContext<RadarState>(Symbol.for(SYMBOL_KEY));
}
