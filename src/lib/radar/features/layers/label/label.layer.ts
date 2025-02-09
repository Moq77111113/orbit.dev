import type { Entry, Ring, Section } from "$lib/radar/core/elements/types.js";

import { Layer } from "../base/base.layer.js";

import type { D3Selection, EnrichedSection } from "../base/types.js";

type Group<T> = D3Selection<SVGGElement, T>;

export class LabelLayer extends Layer<EnrichedSection, SVGGElement> {
	protected compare(): boolean {
		// Always trigger a redraw
		return false;
	}

	protected getOne(section: EnrichedSection) {
		const selected = this.#select(section);

		if (selected.empty()) {
			return null;
		}
		return selected.datum(section);
	}

	protected getOrCreate(section: EnrichedSection) {
		const one = this.getOne(section);
		if (one) return one;
		return this.layer
			.append("g")
			.datum(section)
			.attr("class", this.#class(section));
	}

	protected render() {
		for (const [idx, data] of this.data.entries()) {
			const element = this.getOrCreate(data);

			this.applyAttributes(element, idx);
		}
	}

	get corners() {
		const padding = 10;
		const textWidth = 150 + padding;
		const { width, height, radius } = this.dimensions;

		return [
			{
				x: padding,
				y: padding,
			},
			{
				x: width - textWidth,
				y: padding,
			},
			{
				x: width - textWidth,
				y: height - radius /2 - padding,
			},
			{
				x: padding,
				y: height - radius / 2 - padding,
			},
		];
	}
	#initialIndex(sectionIdx: number) {
		return this.data.reduce((acc, curr, idx) => {
			if (idx < sectionIdx) {
				const ringEntries = curr.rings.reduce(
					(entriesCount, ring) => entriesCount + ring.entries.length,
					0,
				);
				return acc + ringEntries;
			}
			return acc;
		}, 0);
	}
	protected applyAttributes(group: Group<EnrichedSection>, sectionIdx: number) {
		const section = group.datum();
		const positon = this.#position(section);

		group.attr("transform", `translate(${positon.x}, ${positon.y})`);
		this.#fillSection(group);

		let index = this.#initialIndex(sectionIdx);

		let yOffset = 24;

		const nonEmptyRings = section.rings
			.filter((ring) => ring.entries.length > 0)
			.sort(this.#sortRings.bind(this));

		for (const ring of nonEmptyRings) {
			const ringGroup = this.#getOrCreateRing(group, ring);

			this.#fillRing(ringGroup, yOffset);
			yOffset += 12;

			for (const entry of ring.entries) {
				index++;
				const entryGroup = this.#getOrCreateEntry(ringGroup, entry);
				this.#fillEntry(entryGroup, index, yOffset);

				yOffset += 12;
			}
		}
	}

	#class(section: Section) {
		return `label-${section.id}` as const;
	}

	#select(section: Section) {
		return this.layer.select<SVGGElement>(`.${this.#class(section)}`);
	}

	#position(section: Section) {
		const itemsPerRow = 4;
		const minHeight = 150;

		const position = this.radar.sections.findIndex((s) => s.id === section.id);

		if (position < 4) {
			const corner = this.corners[position];
			return {
				x: corner.x,
				y: corner.y,
			};
		}

		const adjustedPosition = position - 4;
		const col = Math.floor(adjustedPosition / itemsPerRow);
		const row = adjustedPosition % itemsPerRow;

		const availableWidth = this.dimensions.width - this.dimensions.height / 2;
		const availableHeight = this.dimensions.height - this.dimensions.height / 2;

		const remainingSections = this.radar.sections.length - 4;
		const rowCount = Math.ceil(remainingSections / itemsPerRow);

		const sectionWidth = availableWidth / itemsPerRow;
		const sectionHeight = Math.max(minHeight, availableHeight / rowCount);

		const x = row * sectionWidth;
		const y = this.dimensions.height / 2 + col * sectionHeight;

		return { x, y };
	}

	#sortRings(a: Ring, b: Ring) {
		const aIdx = this.radar.rings.findIndex((r) => r.id === a.id);
		const bIdx = this.radar.rings.findIndex((r) => r.id === b.id);
		return aIdx - bIdx;
	}
	#getOrCreateRing(parent: Group<EnrichedSection>, ring: Ring) {
		const selected = parent.select<SVGGElement>(`.ring-${ring.id}`);
		if (!selected.empty()) return selected.datum(ring);

		return parent.append("g").attr("class", `ring-${ring.id}`).datum(ring);
	}

	#getOrCreateEntry(parent: Group<Ring>, entry: Entry) {
		const selected = parent.select<SVGGElement>(`.entry-${entry.id}`);
		if (!selected.empty()) return selected.datum(entry);

		return parent
			.append("g")
			.attr("class", `entry-${entry.id}`)
			.datum(entry)
			.on("mouseover", () => {
				this.dispatcher.dispatch("entry/highlight", {
					entryId: entry.id,
					highlight: true,
				});
			})
			.on("mouseout", () => {
				this.dispatcher.dispatch("entry/highlight", {
					entryId: entry.id,
					highlight: false,
				});
			});
	}

	#fillSection(section: Group<EnrichedSection>) {
		let text = section.select<SVGTextElement>("text");
		if (text.empty()) {
			text = section.append("text");
		}

		text = text
			.attr("dy", "1em")
			.style("font-weight", "bold")
			.style("font-size", "12px")
			.style("display", "flex")
			.style("justify-content", "center")
			.style("align-items", "center")
			.style("text-overflow", "ellipsis")
			.style("overflow", "hidden")
			.style("fill", this.config.theme.colors.text)
			.text((d) => d.name);

		const textWidth = text.node()?.getComputedTextLength() ?? 0;
		const max = this.dimensions.radius - 20;
		if (textWidth > this.dimensions.radius - 20) {
			let content = text.text();
			while (content.length > 0 && textWidth > max) {
				content = content.slice(0, -1);
			}
			text.text(`${content}...`);
		}
	}

	#fillRing(ring: Group<Ring>, yOffset: number) {
		let text = ring.select<SVGTextElement>("text");
		if (text.empty()) {
			text = ring.append("text");
		}

		text = text
			.attr("dy", `${yOffset}px`)
			.style("font-weight", "bold")
			.style("font-size", "12px")
			.style("fill", (d) => d.color)
			.text((d) => d.name);
	}

	#fillEntry(entry: Group<Entry>, idx: number, yOffset: number) {
		entry
			.attr("transform", `translate(10, ${yOffset})`)
			.style("cursor", "pointer");

		let text = entry.select<SVGTextElement>("text");
		if (text.empty()) {
			text = entry.append("text");
		}

		text = text
			.attr("x", 10)
			.attr("dy", "0.32em")
			.attr("font-size", "12px")
			.attr("fill", this.config.theme.colors.text)
			.text((d) => [idx, d.name].join(". "));
	}
}
