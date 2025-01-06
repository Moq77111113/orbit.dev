import * as d3 from "d3";
import { color } from "~/lib/utils/color.js";
import type { Target } from "~/types/radar-options.js";
import type { Entry } from "~/types/radar.js";
import { DrawService } from "./base.js";

interface TooltipConfig {
	duration: {
		fadeIn: number;
		fadeOut: number;
	};
	opacity: {
		visible: number;
		hidden: number;
	};
}

export class EntryService extends DrawService {
	private tooltip: d3.Selection<
		HTMLDivElement,
		unknown,
		HTMLElement,
		any
	> | null = null;
	private readonly config: TooltipConfig = {
		duration: {
			fadeIn: 200,
			fadeOut: 500,
		},
		opacity: {
			visible: 1,
			hidden: 0,
		},
	};

	private getTooltip(): d3.Selection<
		HTMLDivElement,
		unknown,
		HTMLElement,
		any
	> {
		if (!this.tooltip) {
			this.tooltip = d3
				.select("main")
				.append("div")
				.attr("class", "tooltip")
				.style("opacity", this.config.opacity.hidden);
		}
		return this.tooltip;
	}

	public static createShape(entry: Entry, size: number) {
		const shapes = {
			moved: (element: Target, entry: Entry) =>
				element
					.append("path")
					.attr("d", d3.symbol().type(d3.symbolTriangle).size(size))
					.attr("transform", (entry.moved ?? 0) < 0 ? "rotate(180)" : ""),
			new: (element: Target) =>
				element
					.append("path")
					.attr("d", d3.symbol().type(d3.symbolStar).size(size)),
			default: (element: Target) =>
				element
					.append("path")
					.attr("d", d3.symbol().type(d3.symbolCircle).size(size)),
		};

		return (element: Target) => {
			if (entry.isNew) return shapes.new(element);
			if (entry.moved) return shapes.moved(element, entry);
			return shapes.default(element);
		};
	}

	private generateTooltipHTML(entry: Entry): string {
		const { name, description, tags, moved, isNew } = entry;
		const moveDirection = moved && moved > 0 ? "↑" : "↓";

		return `
      <h3>${name}</h3>
      ${description ? `<p>${description}</p>` : ""}
      ${
				tags?.length
					? `
        <div class="tags">
          ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      `
					: ""
			}
      ${isNew ? '<div class="new">New</div>' : ""}
      ${
				moved
					? `
        <div class="moved ${moved > 0 ? "moved-up" : "moved-down"}">
          ${moveDirection}
        </div>
      `
					: ""
			}
    `;
	}

	private handleTooltipEvents(
		shape: d3.Selection<any, any, any, any>,
		entry: Entry,
		ringColor: string,
		theme: any,
	) {
		shape
			.on("mouseover", (event) => {
				const tooltip = this.getTooltip();
				const { x, y } = event.target.getBoundingClientRect();
				const backgroundColor =
					d3.color(ringColor)?.copy({ opacity: 0.8 })?.toString() || "";

				tooltip
					.transition()
					.duration(this.config.duration.fadeIn)
					.style("opacity", this.config.opacity.visible);

				tooltip
					.html(this.generateTooltipHTML(entry))
					.attr("fill", theme.colors.text)

					.style("border-color", ringColor)
					.style("background-color", backgroundColor)
					.style("left", `${x}px`)
					.style("top", `${y}px`);
			})
			.on("mouseout", () => {
				this.getTooltip()
					.transition()
					.duration(this.config.duration.fadeOut)
					.style("opacity", this.config.opacity.hidden)
					.on("end", () => {
						this.tooltip?.remove();
						this.tooltip = null;
					});
			});
	}

	public addEntry(target: Target, { entry }: { entry: Entry }): void {
		const { theme } = this.radar.config;
		const { radius } = this.radar.geometry;
		const ringWidth = radius / this.radar.rings.length;

		const ring = this.radar.rings.find((r) => r.id === entry.ringId);
		const section = this.radar.sections.find((s) => s.id === entry.sectionId);

		if (!ring || !section) return;

		const position = this.radar.strategy.place(this.radar, entry, ringWidth);
		const group = target
			.append("g")
			.attr("transform", `translate(${position.x}, ${position.y})`)
			.attr("class", "entry")
			.style("cursor", this.radar.config.interactive ? "pointer" : "default");

		const shape = EntryService.createShape(
			entry,
			theme.sizes.entry,
		)(group)
			.attr("fill", ring.color ?? color(ring.name))
			.attr("stroke", "none")
			.attr("class", `entry-${entry.id}`)
			.style("opacity", theme.opacity.entries);

		this.handleTooltipEvents(
			shape,
			entry,
			ring.color ?? color(ring.name),
			theme,
		);
	}

	public draw(target: Target): void {
		for (const entry of this.radar.entries) {
			this.addEntry(target, { entry });
		}
	}

	public static triggerTooltip(entry: Entry): void {
		d3.select(`.${`entry-${entry.id}`}`).dispatch("mouseover");
	}

	public static hideTooltip(entry: Entry): void {
		d3.select(`.${`entry-${entry.id}`}`).dispatch("mouseout");
	}
}
