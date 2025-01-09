import * as d3 from "d3";
import type { Point } from "./types.js";

type D3Tooltip<T> = d3.Selection<HTMLDivElement, T, HTMLElement, unknown>;

type Customization = {
	position: Point;
	background: string;
	border?: string;
	textColor?: string;
	html: string;
};
export function Tooltip() {
	let tooltip: D3Tooltip<Customization | null> | null = null;
	const config = {
		duration: {
			fadeIn: 200,
			fadeOut: 500,
		},
		opacity: {
			visible: 1,
			hidden: 0,
		},
	};

	const show = (customization?: Customization) => {
		if (!tooltip) {
			tooltip = create(customization);
		}

		if (customization) {
			customize(customization);
		}
		tooltip
			.transition()
			.duration(config.duration.fadeIn)
			.style("opacity", config.opacity.visible);
	};

	const create = (customization?: Customization) => {
		if (!tooltip) {
			tooltip = d3
				.select("main")
				.append("div")
				.attr("class", "tooltip")
				.datum(customization ?? null);
		}

		return tooltip;
	};

	const hide = () => {
		if (!tooltip) return;
		tooltip
			.transition()
			.duration(config.duration.fadeOut)
			.style("opacity", config.opacity.hidden);
	};

	/**
	 * Hides the tooltip and removes it from the DOM.
	 */
	const kill = () => {
		if (!tooltip) return;
		hide();
		tooltip.remove();
		tooltip = null;
	};

	const customize = (customization: Customization) => {
		const { position, background, border, textColor, html } = customization;
		tooltip
			?.html(html)
			.attr("fill", textColor ?? "black")
			.style("background", background)
			.style("border", border ?? "none")
			.style("left", `${position.x}px`)
			.style("top", `${position.y}px`);
	};

	return {
		show,

		kill,
		customize,
	};
}
