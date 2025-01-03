import { renderComponent } from "$lib/components/ui/data-table/render-helpers.js";
import type { ColumnDef } from "@tanstack/table-core";

import type { Entry, Ring, Section } from "~/types/radar.js";
import EntryActions from "./(components)/entry-action-cell.svelte";
import EntryCell from "./(components)/entry-cell.svelte";
import SelectValues from "./(components)/select-cell.svelte";
import SortableHeader from "./(components)/sortable-header.svelte";

export type RadarColumn = {
	entry: Entry;
	section: Section;
	ring: Ring;
};

export const columns = (
	sections: Section[],
	rings: Ring[],
): ColumnDef<RadarColumn>[] => [
	{
		accessorKey: "entry",
		sortingFn: (a, b) =>
			a.original.entry.name.localeCompare(b.original.entry.name),
		header: ({ column }) =>
			renderComponent(SortableHeader, {
				label: "Entry",
				order: column.getIsSorted(),
				onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}),
		cell: ({ row }) =>
			renderComponent(EntryCell, {
				entry: row.original.entry.name,
				onChange: (value) => {
					console.log(value);
				},
			}),
	},

	{
		accessorKey: "section",
		sortingFn: (a, b) =>
			a.original.section.name.localeCompare(b.original.section.name),
		header: ({ column }) =>
			renderComponent(SortableHeader, {
				label: "Section",
				order: column.getIsSorted(),
				onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}),
		cell: ({ row }) =>
			renderComponent(SelectValues, {
				value: row.original.section.name,
				values: sections.map((_) => _.name),
				onChange: (value) => {
					console.log(value);
				},
			}),
	},
	{
		accessorKey: "ring",
		sortingFn: (a, b) =>
			rings.findIndex((_) => _.id === a.original.ring.id) -
			rings.findIndex((_) => _.id === b.original.ring.id),
		header: ({ column }) =>
			renderComponent(SortableHeader, {
				label: "Ring",
				order: column.getIsSorted(),
				onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}),
		cell: ({ row }) =>
			renderComponent(SelectValues, {
				value: row.original.ring.name,
				values: rings.map((_) => _.name),
				onChange: (value) => {
					console.log(value);
				},
			}),
	},
	{
		accessorKey: "action",
		header: "",
		cell: ({ row }) =>
			renderComponent(EntryActions, {
				entry: row.original.entry,
				sections: [row.original.section],
				rings: [row.original.ring],
			}),
	},
];
