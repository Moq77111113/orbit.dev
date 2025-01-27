import { z } from "zod";

const themeschema = z.object({
	colors: z.object({
		grid: z.string(),
		text: z.string(),
	}),
	opacity: z.object({
		rings: z.number(),
		text: z.number(),
		entries: z.number(),
	}),
	fontSizes: z.object({
		rings: z.number(),
		entries: z.number(),
	}),
	sizes: z.object({
		entry: z.number(),
		strokeWidth: z.number(),
	}),
});

const entryPlacementSchema = z.union([
	z.literal("random"),
	z.literal("distributed"),
	z.literal("clustered"),
	z.literal("spiral"),
]);

export const configSchema = z.object({
	theme: themeschema,
	entryPlacement: entryPlacementSchema,
	showLabels: z.boolean(),
	interactive: z.boolean(),
});
