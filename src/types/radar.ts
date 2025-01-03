type RingId = `rng-${string}`;
type SectionId = `sec-${string}`;
type EntryId = `ent-${string}`;
export type Ring = {
	id: RingId;
	name: string;
	color?: string;
};

export type Section = {
	id: SectionId;
	name: string;
	color?: string;
};

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

export type Radar = {
	title: string;
	rings: Ring[];
	sections: Section[];
	entries: Entry[];
};
