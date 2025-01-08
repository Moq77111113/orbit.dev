import * as d3 from "d3";
import type { Entry, Ring, Section } from "~/lib/radar/elements/types.js";

import { Layer } from "./base.layer.js";

import { color } from "~/lib/utils/color.js";
import type { Merge } from "~/types/utils.js";
import { Clustered, Distributed, Random, Spiral } from "./entry/index.js";
import type { EntryPlacementContext, Point } from "./entry/types.js";
import type { Attrbutes, D3Selection } from "./types.js";
type EnrichedEntry = Merge<Entry, { section: Section; ring: Ring }>;

type EntrySymbols = "moved" | "new" | "default";

type Selection = D3Selection<SVGPathElement, EnrichedEntry>;

export class EntryLayer extends Layer<EnrichedEntry, SVGPathElement> {
	#strategies = {
		clustered: (ctx) => Clustered(ctx, {}),
		distributed: (ctx) => Distributed(ctx, {}),
		random: (ctx) => Random(ctx, {}),
		spiral: (ctx) => Spiral(ctx, {}),
	} satisfies Record<
		typeof this.config.entryPlacement,
		(ctx: EntryPlacementContext) => Point
	>;

	protected getOrCreate(entry: EnrichedEntry) {
		const exist = this.#select(entry);
		if (!exist.empty()) {
			return exist.datum(entry);
		}
		return this.layer
			.append("path")
			.datum(entry)
			.attr("class", this.#class(entry));
	}

	protected applyAttributes(path: Selection) {
		const entry = path.datum();
		const attrs: Attrbutes<SVGPathElement, EnrichedEntry>[] = [];
		const { x, y } = this.#getPosition(entry);

		attrs.push(["transform", `translate(${x}, ${y})`]);

		let shapeType = this.#symbols.default;
		if (entry.isNew) shapeType = this.#symbols.new;

		if (entry.moved) {
			shapeType = this.#symbols.moved;
		}

		attrs.push(["d", shapeType.size(this.config.theme.sizes.entry)]);

		if ((entry.moved ?? 0) < 0) {
			attrs.push(["transform", () => "rotate(180)"]);
		}

		attrs.push(
			["fill", entry.ring.color],
			["stroke", this.config.theme.colors.grid],
			["stroke-width", this.config.theme.sizes.strokeWidth],
			["stroke-dasharray", "4,4"],
		);

		for (const [key, value] of attrs) {
			path.attr(key, value);
		}
	}

	#class(entry: EnrichedEntry) {
		return `entry-${entry.id}` as const;
	}

	#select(entry: EnrichedEntry) {
		return this.layer.select<SVGPathElement>(`.${this.#class(entry)}`);
	}

	#getPosition(entry: EnrichedEntry) {
		const sectionIdx = this.radar.sections.findIndex(
			(_) => _.id === entry.sectionId,
		);
		const ringIdx = this.radar.rings.findIndex((_) => _.id === entry.ringId);

		const startAngle =
			sectionIdx * ((2 * Math.PI) / this.radar.sections.length);

		const endAngle =
			(sectionIdx + 1) * ((2 * Math.PI) / this.radar.sections.length);
		const ringWidth = this.dimensions.radius / this.radar.rings.length;
		const minRadius = ringIdx * ringWidth;
		const maxRadius = (ringIdx + 1) * ringWidth;
		const context = {
			entry,
			section: entry.section,
			ring: entry.ring,
			startAngle,
			endAngle,
			minRadius,
			maxRadius,
		} satisfies EntryPlacementContext;

		return this.#strategies[this.config.entryPlacement](context);
	}

	#symbols = {
		moved: d3.symbol().type(d3.symbolTriangle),
		new: d3.symbol().type(d3.symbolStar),
		default: d3.symbol().type(d3.symbolCircle),
	} satisfies Record<EntrySymbols, d3.Symbol<unknown, unknown>>;
}
