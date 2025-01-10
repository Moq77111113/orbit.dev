import type { RadarConfig } from "$lib/radar/core/config/types.js";
import {
	type Symbol as d3Symbol,
	symbol,
	symbolStar,
	symbolTriangle,
} from "d3";

import type { EnrichedEntry } from "../../base/types.js";

type EntrySymbols = "moved" | "new" | "default";

type ToSized = {
	// biome-ignore lint/suspicious/noExplicitAny: any is required by d3
	size(size: number): d3Symbol<any, any>;
};
const symbols: Record<EntrySymbols, ToSized> = {
	moved: symbol().type(symbolTriangle),
	new: symbol().type(symbolStar),
	default: symbol().type(symbolTriangle),
} as const;

export const entrySymbol = (ctx: RadarConfig, entry: EnrichedEntry) => {
	let symbol = symbols.default;
	if (entry.isNew) {
		symbol = symbols.new;
	}

	if (entry.moved) {
		symbol = symbols.moved;
	}

	return symbol.size(ctx.theme.sizes.entry);
};
