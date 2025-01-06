import type { Pretty } from "~/types/utils.js";

type RingAction = "ring/add" | "ring/remove" | "ring/update";

type SectionAction = "section/add" | "section/remove" | "section/update";

type EntryAction = "entry/add" | "entry/remove" | "entry/update";

export type ActionName = Pretty<RingAction | SectionAction | EntryAction>;


