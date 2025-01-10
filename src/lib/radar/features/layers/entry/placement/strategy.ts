import type { RadarEntryPlacement } from "$lib/radar/core/config/types.js";
import { Clustered } from "./strategies/clustered.js";
import { Distributed } from "./strategies/distributed.js";
import { Random } from "./strategies/random.js";
import { Spiral } from "./strategies/spiral.js";
import type { EntryPlacementContext, Point } from "./types.js";

export const placementStrategies = {
	clustered: (ctx) => Clustered(ctx, {}),
	distributed: (ctx) => Distributed(ctx, {}),
	random: (ctx) => Random(ctx, {}),
	spiral: (ctx) => Spiral(ctx, {}),
} satisfies Record<RadarEntryPlacement, (ctx: EntryPlacementContext) => Point>;
