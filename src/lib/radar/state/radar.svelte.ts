import type { RadarConfig } from "$lib/radar/config/types.js";
import { getContext, setContext } from "svelte";
import type { AppState } from "~/lib/radar/state/types.js";
import { ActionManager } from "../actions/manager.js";
import { actions } from "../actions/register.js";
import type { ActionResult } from "../actions/types/action-function.js";
import { initRadar } from "../elements/init.js";
import type { Radar } from "../elements/types/radar.js";
import { getDefaultState } from "./state.js";

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

		if (actionResult.appState) {
			const radar =
				actionResult.appState.radar || this.#state.radar || this.props.radar;
			const radarConfig =
				actionResult.appState.radarConfig ||
				this.state.radarConfig ||
				this.props.config;
			const errors = actionResult.appState.errors || this.state.errors;
			this.#state = {
				...this.#state,
				...actionResult.appState,
				radar,
				radarConfig,
				errors,
			};
		}
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

		this.#actionManager = new ActionManager(this.doUpdate, () => this.state);

		this.#actionManager.registerActions(actions);
	}
}

const SYMBOL_KEY = "orb-radar";

export function createRadarState(props: Props) {
	return setContext(Symbol.for(SYMBOL_KEY), new RadarState(props));
}

export function useRadar() {
	return getContext<RadarState>(Symbol.for(SYMBOL_KEY));
}
