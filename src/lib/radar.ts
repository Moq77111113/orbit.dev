import * as d3 from "d3";
import type { Entry, Radar, Ring, Section } from "~/types/radar.js";
import type { RadarConfig } from "~/types/theme.js";
import { drawEntries } from "./radar/entries.js";
import { calculateGeometry } from "./radar/geometry.js";
import { drawRings } from "./radar/rings.js";
import { drawSections } from "./radar/section.js";
import { defaultConfig } from "./theme.js";
export function createEqualSections(names: string[]): Section[] {
	const angle = (2 * Math.PI) / names.length;
	return Array.from({ length: names.length }, (_, i) => ({
		id: `sec-${i}`,
		name: names[i],
		startAngle: i * angle,
		endAngle: (i + 1) * angle,
	}));
}

export type Container = { width: number; height: number };
type DrawProps = {
	radar: Radar;
	container: Container;
	config: Partial<RadarConfig>;
};

export function drawRadar(svg: SVGElement, props: DrawProps) {
	const { radar, container, config: currentConfig } = props;

	const config = { ...defaultConfig, ...currentConfig };

	const geometry = calculateGeometry(container);

	const element = d3.select(svg);

	element.selectAll("*").remove();

	const g = element
		.append("g")
		.attr("transform", `translate(${geometry.center.x}, ${geometry.center.y})`);

	drawRings(g, { radar, geometry });
	drawSections(g, { radar, geometry });
	drawEntries(g, { radar, geometry });
}
