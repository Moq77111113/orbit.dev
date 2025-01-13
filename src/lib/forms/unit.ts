import { z } from "zod";
export const ringId = z.custom<`rng-${string}`>((val) => /^rng-.+$/.test(val));
export const sectionId = z.custom<`sec-${string}`>((val) =>
	/^sec-.+$/.test(val),
);
export const entryId = z.custom<`ent-${string}`>((val) => /^ent-.+$/.test(val));
