import type { EnrichedEntry } from "$lib/radar/features/layers/base/types.js";
import type { Merge, Pretty } from "$lib/types/utils.js";
import type { EntryElement, RingElement, SectionElement } from "./radar.js";

export type EnrichedEntryElement = Pretty<Merge<EnrichedEntry, EntryElement>>;
export type RingNode = Pretty<
	Merge<RingElement, { entries: EnrichedEntryElement[] }>
>;
export type SectionNode = Pretty<Merge<SectionElement, { rings: RingNode[] }>>;

export type RadarTree = SectionNode[];
