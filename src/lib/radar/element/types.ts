import type { Ring } from "~/types/radar.js";
import type { Merge } from "~/types/utils.js";

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

type SectionElement = RadarElementBase & {
	type: "section";
};

type EntryElement = RadarElementBase & {
	type: "entry";
};

export type RadarElement = RingElement | SectionElement | EntryElement;
