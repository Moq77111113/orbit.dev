import type { Ring } from "$lib/radar/core/elements/ring.js";
import type { Creatable } from "$lib/types/utils.js";
import { color } from "$lib/utils/color.js";
import { z } from "zod";
import { entryId } from "./unit.js";
export const ringForm = z.object({
	id: entryId.optional(),
	name: z.string(),
	color: z.string().default(color()),
});

ringForm._output satisfies Creatable<Ring>;

export type RingSchema = z.infer<typeof ringForm>;
