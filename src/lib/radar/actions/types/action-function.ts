import type { AppState } from "~/types/app.js";
import type { RadarElement } from "../../element/types.js";
import type { StoreType } from "./storage.js";

export type ActionResult = {
	elements?: RadarElement[];
	appState?: Partial<AppState>;
	store?: StoreType;
};
export type ActionPerform = (
	element: RadarElement[],
	appState: Readonly<AppState>,
	data: unknown,
) => ActionResult | Promise<ActionResult>;

export type ActionPredicate = (
	element: RadarElement[],
	appState: Readonly<AppState>,
	data: unknown,
) => boolean;
