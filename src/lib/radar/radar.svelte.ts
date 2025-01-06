import { getContext, setContext } from "svelte";
import type { AppState } from "~/types/app.js";
import type { RadarConfig } from "~/types/config.js";
import type { Radar } from "~/types/radar.js";
import { data } from "../utils/radar.conf.js";
import { ActionManager } from "./actions/manager.js";
import { actions } from "./actions/register.js";
import type { ActionResult } from "./actions/types/action-function.js";
import { getDefaultState } from "./state.js";

type Props = {
	app: string;
	radar: Radar;
	config?: RadarConfig;
};

export class RadarState {
	#defaultState = getDefaultState();

	#state: AppState = $state<AppState>({
		...this.#defaultState,
		radar: data,
		target: {} as SVGElement,
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
			radar: this.props.radar,
			radarConfig: {
				...this.#defaultState.radarConfig,
				...props.config,
			},
			target: null,
		};

		this.#actionManager = new ActionManager(this.doUpdate, () => this.state);

		this.#actionManager.registerActions(actions);
		console.log(this.#state);
	}
}

const SYMBOL_KEY = "orbit.dev";

export function createRadarState(props: Props) {
	return setContext(Symbol.for(SYMBOL_KEY), new RadarState(props));
}

export function useRadar() {
	return getContext<RadarState>(Symbol.for(SYMBOL_KEY));
}
