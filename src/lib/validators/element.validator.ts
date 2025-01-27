import { z } from "zod";

export const radarElementSchema = z.object({
	id: z.string(),
	seed: z.number(),
	version: z.number(),
	isDeleted: z.boolean(),
	updated: z.number(),
});
