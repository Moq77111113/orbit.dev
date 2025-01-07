import type { AppState } from "~/lib/radar/state/types.js";

import type { StoreType } from "./storage.js";

export type ActionResult = {
	appState?: Partial<AppState>;
	store?: StoreType;
};
export type ActionPerform<T = unknown> = (
	appState: Readonly<AppState>,
	data: T,
) => ActionResult | Promise<ActionResult>;

export type ActionPredicate<T = unknown> = (
	appState: Readonly<AppState>,
	data: T,
) => boolean;
