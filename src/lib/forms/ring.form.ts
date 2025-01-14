import type { Ring } from "$lib/radar/core/elements/ring.js";
import type { Creatable } from "$lib/types/utils.js";

import { z } from "zod";
import { ringId } from "./unit.js";
export const ringForm = z.object({
	id: ringId.optional(),
	name: z.string(),
	color: z.string(),
});

ringForm._output satisfies Creatable<Ring>;

export type RingSchema = z.infer<typeof ringForm>;
