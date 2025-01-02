import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "../../ui/data-table/render-helpers.js";

import type { Radar, Ring, Section } from "~/types/radar.js";
import DeleteEntry from "./delete-entry.svelte";
import DropdownSelection from "./dropdown-selection.svelte";
import EditableRow from "./editable-row.svelte";

export type RadarColumn = {
	entry: string;
	section: string;
	ring: string;
};

export const columns = (sections: Section[], rings: Ring[]) =>
	[
		{
			accessorKey: "entry",
			header: "Entry",
			cell: ({ row }) =>
				renderComponent(EditableRow, {
					entry: row.original.entry,
					onChange: (value) => {
						console.log(value);
					},
				}),
		},
		{
			accessorKey: "section",
			header: "Section",
			cell: ({ row }) =>
				renderComponent(DropdownSelection, {
					value: row.original.section,
					values: sections.map((_) => _.name),
					onChange: (value) => {
						console.log(value);
					},
				}),
		},
		{
			accessorKey: "ring",
			header: "Ring",
			cell: ({ row }) =>
				renderComponent(DropdownSelection, {
					value: row.original.ring,
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
	] satisfies ColumnDef<RadarColumn>[];
