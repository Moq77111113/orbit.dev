import type { Pretty } from "~/types/utils.js";

type RingAction =
	| "ring/add"
	| "ring/remove"
	| "ring/update"
	| "ring/move"
	| "ring/recolor"
	| "ring/rename";

type SectionAction =
	| "section/add"
	| "section/remove"
	| "section/update"
	| "section/rename";

type EntryAction = "entry/add" | "entry/remove" | "entry/update";

export type ActionName = Pretty<RingAction | SectionAction | EntryAction>;
