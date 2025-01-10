import { z } from "zod";

export const entrySchema = z.object({
	id: z.custom<`ent-${string}`>((val) => /^ent-.+$/.test(val)).optional(),
	name: z.string(),
	description: z.string().optional(),
	sectionId: z.custom<`sec-${string}`>((val) => /^sec-.+$/.test(val)),
	ringId: z.custom<`rng-${string}`>((val) => /^rng-.+$/.test(val)),
	isNew: z.boolean().optional().default(false).optional(),
	link: z.string().url().optional(),
	moved: z.union([z.literal(-1), z.literal(0), z.literal(1)]).optional(),
	tags: z.array(z.string()).readonly().optional(),
});

export type EntrySchema = z.infer<typeof entrySchema>;
