import type {
	EnrichedEntryElement,
	Radar,
	RadarTree,
	SectionNode,
} from "./types.js";

/**
 * Converts a flat list of entries into a tree structure
 * The structure is sorted by the order of the sections and rings
 */
export const asTree = (root: Radar) => {
	const { entries, rings, sections } = root;

	const sectionMap = new Map(sections.map((section) => [section.id, section]));
	const ringMap = new Map(rings.map((ring) => [ring.id, ring]));

	const unSortedTree = entries.reduce<RadarTree>((tree, entry) => {
		const section = sectionMap.get(entry.sectionId);
		const ring = ringMap.get(entry.ringId);
		if (!section || !ring) return tree;

		let sectionNode = tree.find((node) => node.id === section.id);

		if (!sectionNode) {
			sectionNode = {
				...section,
				rings: [],
			};
			tree.push(sectionNode);
		}

		let ringNode = sectionNode.rings.find((node) => node.id === ring.id);
		if (!ringNode) {
			ringNode = {
				...ring,
				entries: [],
			};
			sectionNode.rings.push(ringNode);
		}
		const enrichedEntry = { ...entry, ring, section };
		ringNode.entries.push(enrichedEntry);

		return tree;
	}, []);

	return unSortedTree
		.map((section) => ({
			...section,
			rings: section.rings.sort((a, b) => sortItems(a, b, rings)),
		}))
		.sort((a, b) => sortItems(a, b, sections)) satisfies RadarTree;
};

function sortItems<T extends { id: string }, U extends T>(
	a: U,
	b: U,
	order: T[],
) {
	return (
		order.findIndex((item) => item.id === a.id) -
		order.findIndex((item) => item.id === b.id)
	);
}

export const flatten = (section: SectionNode) => {
	return section.rings.reduce<EnrichedEntryElement[]>(
		(acc, ring) => acc.concat(ring.entries),
		[],
	);
};
