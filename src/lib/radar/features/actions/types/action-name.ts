import type { Pretty } from "$lib/types/utils.js";

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

type ThemeAction =
	| "theme/color-update"
	| "theme/opacity-update"
	| "theme/font-update"
	| "theme/size-update";

export type ActionName = Pretty<
	RingAction | SectionAction | EntryAction | ThemeAction
>;
