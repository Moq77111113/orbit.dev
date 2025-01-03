import { z } from "zod";

export const entrySchema = z.object({
	id: z.custom<`ent-${string}`>((val) => /^ent-.+$/.test(val)),
	name: z.string(),
	description: z.string().optional(),
	sectionId: z.custom<`sec-${string}`>((val) => /^sec-.+$/.test(val)),
	ringId: z.custom<`rng-${string}`>((val) => /^rng-.+$/.test(val)),
	isNew: z.boolean().optional().default(false),
	link: z.string().url().optional(),
	moved: z.union([z.literal(-1), z.literal(0), z.literal(1)]).optional(),
	tags: z.array(z.string()).optional(),
});

export type Entries = z.infer<typeof entrySchema>;
