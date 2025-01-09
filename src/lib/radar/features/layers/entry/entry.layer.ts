import type { Entry, Ring, Section } from "$lib/radar/core/elements/types.js";
import * as d3 from "d3";

import type { Merge } from "~/types/utils.js";
import { Layer } from "../base/base.layer.js";
import { Tooltip } from "../base/tooltip/tooltip.js";

import type { Attrbutes, D3Selection } from "../base/types.js";

import { Clustered, Distributed, Random, Spiral } from "./placement/index.js";
import type { EntryPlacementContext, Point } from "./placement/types.js";
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

	protected compare(a: EnrichedEntry, b: EnrichedEntry): boolean {
		return a.id === b.id;
	}

	protected getOne(entry: EnrichedEntry) {
		const selected = this.#select(entry);
		if (selected.empty()) {
			return null;
		}
		return selected.datum(entry);
	}

	protected getOrCreate(entry: EnrichedEntry) {
		const one = this.getOne(entry);
		if (one) return one;

		const { x, y } = this.#getPosition(entry);
		return this.layer
			.append("path")
			.datum(entry)
			.attr("class", this.#class(entry))
			.attr("transform", `translate(${x}, ${y})`);
	}

	protected applyAttributes(path: Selection) {
		const entry = path.datum();
		const attrs: Attrbutes<SVGPathElement, EnrichedEntry>[] = [];

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
			["stroke", "none"],
			["stroke-width", this.config.theme.sizes.strokeWidth],
			["stroke-dasharray", "4,4"],
		);

		for (const [key, value] of attrs) {
			path.attr(key, value);
		}

		if (this.config.interactive) {
			this.#addTooltip(path);
		}
	}

	#tooltip = Tooltip();

	#addTooltip(path: Selection) {
		const entry = path.datum();
		path
			.on("mouseover", (event) => {
				const { x, y } = event.target.getBoundingClientRect();
				const background =
					d3.color(entry.ring.color)?.copy({ opacity: 0.8 }).toString() ?? "";

				this.#tooltip.show({
					position: { x, y },
					background,
					border: entry.ring.color,
					textColor: this.config.theme.colors.text,
					html: this.#html(entry),
				});
			})
			.on("mouseout", () => {
				this.#tooltip.kill();
			});
	}

	#html(entry: EnrichedEntry) {
		const { name, description, tags, moved, isNew } = entry;
		const parts = [`<h3>${name}</h3>`];

		if (description) {
			parts.push(`<p>${description}</p>`);
		}

		if (tags?.length) {
			parts.push(`
			  <div class="tags">
				${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
			  </div>
			`);
		}

		if (isNew) {
			parts.push('<div class="new">New</div>');
		}

		if (moved) {
			parts.push(`
			  <div class="moved ${moved > 0 ? "moved-up" : "moved-down"}">
				${moved > 0 ? "↑" : "↓"}
			  </div>
			`);
		}

		return parts.join("");
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
