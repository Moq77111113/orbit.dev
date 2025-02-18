import * as d3 from "d3";

import { Layer } from "../base/base.layer.js";
import { Tooltip } from "../base/tooltip/tooltip.js";

import type { Attrbutes, D3Selection, EnrichedEntry } from "../base/types.js";

import type {
	RingId,
} from "$lib/radar/core/elements/types.js";
import { className, html } from "./helpers/dom.js";
import { entrySymbol } from "./helpers/symbols.js";
import { placementStrategies } from "./placement/strategy.js";
import type { EntryPlacementContext } from "./placement/types.js";

type Selection = D3Selection<SVGGElement, EnrichedEntry>;

export class EntryLayer extends Layer<EnrichedEntry, SVGGElement> {
	#tooltip = Tooltip();

	constructor(...props: ConstructorParameters<typeof Layer>) {
		super(...props);
		this.#registerListeners();
	}

	#registerListeners() {
		this.dispatcher.on("entry/highlight", (payload) => {
			const selected = this.#select(payload.entryId);
			if (selected.empty()) return;

			selected.dispatch(payload.highlight ? "mouseover" : "mouseout");
		});
	}

	protected compare(a: EnrichedEntry, b: EnrichedEntry): boolean {
		return (
			a.id === b.id && a.sectionId === b.sectionId && a.ringId === b.ringId
		);
	}

	protected getOne(entry: EnrichedEntry) {
		const selected = this.#select(entry.id);
		if (selected.empty()) {
			return null;
		}
		return selected.datum(entry);
	}

	protected getOrCreate(entry: EnrichedEntry) {
		const one = this.getOne(entry);
		if (one) return one;

		return this.layer
			.append("g")
			.datum(entry)
			.attr("class", className(entry.id));
	}

	#sortRings(a: RingId, b: RingId) {
		const aIdx = this.radar.rings.findIndex((r) => r.id === a);
		const bIdx = this.radar.rings.findIndex((r) => r.id === b);
		return aIdx - bIdx;
	}

	#entryIdx(entry: EnrichedEntry) {
		const targetSectionIdx = this.radar.sections.findIndex(
			(_) => _.id === entry.sectionId,
		);

		let index = 1;
		for (let sectionIdx = 0; sectionIdx <= targetSectionIdx; sectionIdx++) {
			const sectionId = this.radar.sections[sectionIdx].id;
			const sectionEntries = this.radar.entries
				.filter((e) => e.sectionId === sectionId)
				.sort((a, b) => this.#sortRings(a.ringId, b.ringId));

			if (sectionIdx === targetSectionIdx) {
				index += sectionEntries.findIndex((e) => e.id === entry.id);
				break;
			}

			index += sectionEntries.length;
		}
		return index;
	}
	protected applyAttributes(group: Selection) {
		const entry = group.datum();

		const index = this.#entryIdx(entry);

		const { x, y } = this.#getPosition(entry);
		group.attr("transform", `translate(${x}, ${y})`);

		const symbol = entrySymbol(this.config, entry);
		const attrs: Attrbutes<SVGPathElement, EnrichedEntry>[] = [["d", symbol]];
		if (entry.moved) {
			attrs.push(["transform", `rotate(${entry.moved < 0 ? 180 : 0})`]);
		}

		attrs.push(
			["fill", entry.ring.color],
			["stroke", "none"],
			["stroke-width", this.config.theme.sizes.strokeWidth],
			["stroke-dasharray", "4,4"],
		);

		let path = group.select<SVGPathElement>("path");
		if (path.empty()) {
			path = group.append("path");
		}
		for (const [key, value] of attrs) {
			path.attr(key, value);
		}

		let text = group.select<SVGTextElement>("text");
		if (text.empty()) {
			text = group.append("text");
		}
		const font = Math.floor(
			Math.max(10, (4 / 100) * this.config.theme.sizes.entry),
		);

		text
			.attr("y", "3")
			.attr("text-anchor", "middle")
			.style("fill", "white")
			.style("font-size", `${font}px`)
			.style("pointer-events", "none")
			.style("user-select", "none")
			.text(index.toString());

		if (this.config.interactive) {
			group.style("cursor", "pointer");
			this.#addTooltip(group);
		}
	}

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
					html: html(entry),
				});
			})
			.on("mouseout", () => {
				this.#tooltip.kill();
			});
	}

	#select(id: EnrichedEntry["id"]) {
		return this.layer.select<SVGGElement>(className(id, true));
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

		const sectionSiblings = this.radar.entries
			.filter((_) => _.sectionId === entry.sectionId)
			.sort(
				(a, b) =>
					this.radar.rings.findIndex((_) => _.id === a.ringId) -
					this.radar.rings.findIndex((_) => _.id === b.ringId),
			);

		const rate =
			sectionSiblings.findIndex((_) => _.id === entry.id) /
			sectionSiblings.length;
		const context = {
			entry,
			section: entry.section,
			ring: entry.ring,
			startAngle,
			endAngle,
			minRadius,
			maxRadius,
			rate,
		} satisfies EntryPlacementContext;

		return placementStrategies[this.config.entryPlacement](context);
	}
}
