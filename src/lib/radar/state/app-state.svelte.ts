import type { RadarConfig } from "$lib/radar/core/config/types.js";
import { ActionManager } from "$lib/radar/features/actions/manager.js";
import { actions } from "$lib/radar/features/actions/register.js";
import type {
	Action,
	ActionResult,
} from "$lib/radar/features/actions/types/index.js";
import type { AppState } from "$lib/radar/state/types.js";
import { getContext, setContext } from "svelte";

import type { Radar } from "$lib/radar/core/elements/types.js";
import type { StateObserver } from "$lib/radar/state/observers/types.js";
import { radarSchema } from "$lib/validators/radar.validator.js";
import { createRandomRadar } from "../core/elements/stubs.js";
import { getDefaultState } from "./default.js";
import { StorageObserver } from "./observers/storage.js";

type Props = {
	radar?: Radar;
	config?: RadarConfig;
};

export class Orbit {
	#defaultState = getDefaultState();

	#state: AppState = $state<AppState>({
		...this.#defaultState,
		radar: createRandomRadar(),
	});

	#actionManager: ActionManager;

	get state() {
		return this.#state;
	}

	private doUpdate(actionResult: ActionResult) {
		if (!actionResult || !actionResult.appState) return;

		const { radar, radarConfig, errors, ...rest } = actionResult.appState;

		this.#state = {
			...this.#state,
			...rest,
			radar: this.#validateRadar(radar),
			radarConfig: this.#getConfig(radarConfig),
			errors: errors || this.state.errors,
		};
	}

	constructor(public readonly props: Props) {
		const storage = new StorageObserver();
		const { radar: storedRadar, config: storedConfig } = storage.load();
		this.#state = {
			...this.#defaultState,
			radar: this.#validateRadar(storedRadar),
			radarConfig: this.#getConfig(
				storedConfig ?? this.#defaultState.radarConfig,
			),
		};
		this.#actionManager = new ActionManager(
			this.doUpdate.bind(this),
			() => this.state,
		);

		this.#actionManager.registerActions(actions);
		this.addObserver(storage);
	}

	execute<T extends Action>(action: T, data: Parameters<T["perform"]>[1]) {
		this.#actionManager.executeAction(action, data);
	}

	addObserver(observer: StateObserver) {
		this.#actionManager.addObserver(observer);
		observer.update(this.state);
	}

	bindVector(svg: SVGElement) {
		this.#state.vector = svg;
	}

	#validateRadar(radar?: unknown): Radar {
		try {
			return radarSchema.parse(radar);
		} catch {
			return this.#state.radar || this.props.radar;
		}
	}

	#getConfig(newConfig?: RadarConfig): RadarConfig {
		return newConfig || this.#state.radarConfig || this.props.config;
	}
}

const SYMBOL_KEY = "orbit";

export function createOrbitState(props: Props) {
	return setContext(Symbol.for(SYMBOL_KEY), new Orbit(props));
}

export function useOrbit() {
	return getContext<Orbit>(Symbol.for(SYMBOL_KEY));
}
