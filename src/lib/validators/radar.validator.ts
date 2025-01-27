import type { Radar } from "$lib/radar/core/elements/types.js";
import { z } from "zod";
import { radarElementSchema } from "./element.validator.js";
import { entrySchema } from "./entry.validator.js";
import { ringSchema } from "./ring.validator.js";
import { sectionSchema } from "./section.validator.js";

const sectionElementSchema = radarElementSchema
	.merge(sectionSchema)
	.merge(z.object({ type: z.literal("section") }));

const ringElementSchema = radarElementSchema
	.merge(ringSchema)
	.merge(z.object({ type: z.literal("ring") }));

const entryElementSchema = radarElementSchema
	.merge(entrySchema)
	.merge(z.object({ type: z.literal("entry") }));

sectionElementSchema._output satisfies Radar["sections"][number];
export const radarSchema = z.object({
	sections: z.array(sectionElementSchema),
	rings: z.array(ringElementSchema),
	entries: z.array(entryElementSchema),
});
radarSchema._output satisfies Radar;
