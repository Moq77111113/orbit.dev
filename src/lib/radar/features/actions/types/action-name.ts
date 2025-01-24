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

type ConfigAction = "config/layout-update";

type ExportAction = "export/svg" | "export/png" | "export/json";
type ClipActions = "clip/svg" | "clip/png" | "clip/json";

type RadarAction = 'radar/clear' | 'radar/randomize'
export type ActionName = Pretty<
	| RadarAction
	| RingAction
	| SectionAction
	| EntryAction
	| ThemeAction
	| ConfigAction
	| ExportAction
	| ClipActions
>;
