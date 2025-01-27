import type { Ring } from "$lib/radar/core/elements/types.js";
import type { Creatable } from "$lib/types/utils.js";

import { z } from "zod";
import { ringId } from "./unit.js";

export const ringSchema = z.object({
	id: ringId,
	name: z.string(),
	color: z.string(),
});
export const ringForm = ringSchema.extend({
	id: ringId.optional(),
});

ringForm._output satisfies Creatable<Ring>;

export type RingForm = z.infer<typeof ringForm>;
