import type { Section } from "$lib/radar/core/elements/types.js"
import type { Creatable } from "$lib/types/utils.js";

import { z } from "zod";
import { sectionId } from "./unit.js";
export const sectionForm = z.object({
	id: sectionId.optional(),
	name: z.string(),
});

sectionForm._output satisfies Creatable<Section>;

export type SectionSchema = z.infer<typeof sectionForm>;
