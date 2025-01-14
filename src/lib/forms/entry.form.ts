import { entryId, ringId, sectionId } from "$lib/forms/unit.js";
import type { Entry } from "$lib/radar/core/elements/entry.js";
import type { Creatable } from "$lib/types/utils.js";
import { z } from "zod";

export const entryForm = z.object({
	id: entryId.optional(),
	name: z.string(),
	description: z.string().optional(),
	sectionId: sectionId,
	ringId: ringId,
	isNew: z.boolean().optional().default(false).optional(),
	link: z.string().url().optional(),
	moved: z.union([z.literal(-1), z.literal(0), z.literal(1)]).optional(),
	tags: z.array(z.string()).readonly().optional(),
});

entryForm._output satisfies Creatable<Entry>;

export type EntrySchema = z.infer<typeof entryForm>;
