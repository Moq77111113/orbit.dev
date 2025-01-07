import type { RingId } from "./ring.js";
import type { SectionId } from "./section.js";

export type EntryId = `ent-${string}`;

export type Entry = {
	id: EntryId;
	name: string;
	sectionId: SectionId;
	ringId: RingId;
	isNew?: boolean;
	description?: string;
	link?: string;
	tags?: string[];
	moved?: 1 | 0 | -1;
};
