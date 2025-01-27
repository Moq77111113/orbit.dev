import type { Entry } from "$lib/radar/core/elements/types.js";
import type { Creatable } from "$lib/types/utils.js";
import { z } from "zod";
import { entryId, ringId, sectionId } from "./unit.js";

export const entrySchema = z.object({
	id: entryId,
	name: z.string(),
	description: z.string().optional(),
	sectionId: sectionId,
	ringId: ringId,
	isNew: z.boolean().optional().default(false).optional(),
	link: z.string().url().optional(),
	moved: z.union([z.literal(-1), z.literal(0), z.literal(1)]).optional(),
	tags: z.array(z.string()).readonly().optional(),
});

export const entryForm = entrySchema.extend({
	id: entryId.optional(),
});
entryForm._output satisfies Creatable<Entry>;

export type EntryForm = z.infer<typeof entryForm>;
