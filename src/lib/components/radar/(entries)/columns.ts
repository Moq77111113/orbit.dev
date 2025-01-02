import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "../../ui/data-table/render-helpers.js";

import type { Entry, Radar, Ring, Section } from "~/types/radar.js";
import DeleteEntry from "./dropdown-action.svelte";
import EditableRow from "./editable-row.svelte";
import SelectValues from "./select-values.svelte";
import SortableHeader from "./sortable-header.svelte";

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
			renderComponent(EditableRow, {
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
			renderComponent(DeleteEntry, {
				onRemove: () => {
					console.log("remove");
				},
			}),
	},
];
