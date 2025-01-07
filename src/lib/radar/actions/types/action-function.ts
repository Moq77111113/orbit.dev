import type { AppState } from "~/lib/radar/state/types.js";

import type { StoreType } from "./storage.js";

export type ActionResult =
	| {
			appState?: Partial<AppState>;
			store?: StoreType;
	  }
	| false;

export type ActionPerform = (
	appState: Readonly<AppState>,
	// biome-ignore lint/suspicious/noExplicitAny: It's up to the action to define the data type
	data: any,
) => ActionResult | Promise<ActionResult>;

export type ActionPredicate = (
	appState: Readonly<AppState>,
	// biome-ignore lint/suspicious/noExplicitAny: It's up to the action to define the data type
	data: any,
) => boolean;
