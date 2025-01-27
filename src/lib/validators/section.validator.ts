import type { Section } from "$lib/radar/core/elements/types.js";
import type { Creatable } from "$lib/types/utils.js";

import { z } from "zod";
import { sectionId } from "./unit.js";

export const sectionSchema = z.object({
	id: sectionId,
	name: z.string(),
});

export const sectionForm = sectionSchema.extend({
	id: sectionId.optional(),
});

sectionForm._output satisfies Creatable<Section>;

export type SectionForm = z.infer<typeof sectionForm>;
