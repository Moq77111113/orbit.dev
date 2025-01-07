import type { Merge, Pretty } from "~/types/utils.js";
import type { Entry } from "./entry.js";
import type { Ring } from "./ring.js";
import type { Section } from "./section.js";

type RadarElementBase = Readonly<{
	id: string;
	seed: number;
	version: number;
	isDeleted: boolean;
	updated: number;
}>;

type RingElement = Merge<
	RadarElementBase,
	Ring & {
		type: "ring";
	}
>;

type SectionElement = Merge<
	RadarElementBase,
	Section & {
		type: "section";
	}
>;

type EntryElement = Merge<
	RadarElementBase,
	Entry & {
		type: "entry";
	}
>;

export type Radar = Pretty<{
	rings: RingElement[];
	sections: SectionElement[];
	entries: EntryElement[];
}>;
