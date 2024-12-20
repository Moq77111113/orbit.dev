import * as d3 from "d3";
import type { DrawOptions, Entry, Radar, Target } from "~/types/radar.js";

import type { RadarConfig } from "~/types/theme.js";
import { defaultConfig } from "../theme.js";
export function drawEntries(target: Target, options: DrawOptions) {
	const { radar, geometry } = options;
	const { entries, config = defaultConfig } = radar;
	const { radius } = geometry;
	const ringWidth = radius / radar.rings.length;
	const strategy = placementStrategy(config.entryPlacement);
	for (const entry of entries) {
		const position = strategy(radar, entry, ringWidth);
		const ring = radar.rings.find((r) => r.id === entry.ringId);

		const group = target
			.append("g")
			.attr("transform", `translate(${position.x}, ${position.y})`)
			.attr("class", "entry")
			.style("cursor", config.interactive ? "pointer" : "default");

		const shape = entryShape(entry, config.theme.sizes.entry);
		shape(group)
			.attr("fill", ring?.color ?? config.theme.colors.ring)
			.attr("stroke", "none")
			.style("opacity", config.theme.opacity.entries);
	}
}

function entryShape(entry: Entry, size: number) {
	return (element: Target) => {
		if (entry.moved) {
			return element
				.append("path")
				.attr("d", d3.symbol().type(d3.symbolTriangle).size(size))
				.attr("transform", entry.moved > 0 ? "rotate(180" : "");
		}

		if (entry.isNew) {
			// Star
			return element
				.append("path")
				.attr("d", d3.symbol().type(d3.symbolStar).size(size));
		}

		// Circle
		return element
			.append("path")
			.attr("d", d3.symbol().type(d3.symbolCircle).size(size));
	};
}

type PlacementOptions = {
	minDistance?: number; // Distance minimale entre les entrées
	jitter?: number; // Facteur de randomisation
	spiralStep?: number; // Pour la stratégie en spirale
	clustersCount?: number; // Nombre de clusters par section
};

type Point = {
	x: number;
	y: number;
};
type PlacementStrategy = (
	radar: Radar,
	entry: Entry,
	ringWidth: number,
) => Point;

function randomPlacement(options: PlacementOptions = {}): PlacementStrategy {
	return (radar, entry, ringWidth) => {
		const sectionIdx = radar.sections.findIndex(
			(s) => s.id === entry.sectionId,
		);
		const section = radar.sections[sectionIdx];
		const ringIndex = radar.rings.findIndex((r) => r.id === entry.ringId);

		if (!section) return { x: 0, y: 0 };

		const startAngle =
			section.startAngle ??
			sectionIdx * ((2 * Math.PI) / radar.sections.length);
		const endAngle =
			section.endAngle ??
			(sectionIdx + 1) * ((2 * Math.PI) / radar.sections.length);

		const angle = startAngle + Math.random() * (endAngle - startAngle);
		const innerRadius = ringIndex * ringWidth;
		const outerRadius = (ringIndex + 1) * ringWidth;
		const r = innerRadius + Math.random() * (outerRadius - innerRadius);
		return {
			x: r * Math.cos(angle),
			y: r * Math.sin(angle),
		};
	};
}

function distributedPlacement(
	options: PlacementOptions = {},
): PlacementStrategy {
	return (radar, entry, ringWidth) => {
		const sectionIdx = radar.sections.findIndex(
			(s) => s.id === entry.sectionId,
		);
		const section = radar.sections[sectionIdx];
		const ringIndex = radar.rings.findIndex((r) => r.id === entry.ringId);

		if (!section) return { x: 0, y: 0 };

		const startAngle =
			section.startAngle ??
			sectionIdx * ((2 * Math.PI) / radar.sections.length);
		const endAngle =
			section.endAngle ??
			(sectionIdx + 1) * ((2 * Math.PI) / radar.sections.length);
		const jitter = options.jitter ?? 0.2;
		const entriesInSection = radar.entries.filter(
			(e) => e.sectionId === entry.sectionId,
		);
		const position = entriesInSection.findIndex((e) => e === entry);
		const total = entriesInSection.length;

		const angle =
			startAngle +
			(endAngle - startAngle) * (position / total) +
			(Math.random() - 0.5) * jitter;

		const innerRadius = ringIndex * ringWidth;
		const outerRadius = (ringIndex + 1) * ringWidth;
		const r =
			innerRadius +
			(outerRadius - innerRadius) * 0.5 +
			(Math.random() - 0.5) * (outerRadius - innerRadius) * 0.3;

		return {
			x: r * Math.cos(angle),
			y: r * Math.sin(angle),
		};
	};
}

function clusteredPlacement(options: PlacementOptions = {}): PlacementStrategy {
	return (radar, entry, ringWidth) => {
		const section = radar.sections.find((s) => s.id === entry.sectionId);
		const ringIndex = radar.rings.findIndex((r) => r.id === entry.ringId);

		if (!section) return { x: 0, y: 0 };

		const clustersCount = options.clustersCount ?? 3;
		const entriesInSection = radar.entries.filter(
			(e) => e.sectionId === entry.sectionId,
		);
		const clusterIndex = entriesInSection.indexOf(entry) % clustersCount;

		const startAngle =
			section.startAngle ??
			radar.sections.findIndex((s) => s.id === entry.sectionId) *
				((2 * Math.PI) / radar.sections.length);
		const endAngle =
			section.endAngle ??
			(radar.sections.findIndex((s) => s.id === entry.sectionId) + 1) *
				((2 * Math.PI) / radar.sections.length);

		const angleStep = (endAngle - startAngle) / clustersCount;
		const angle = startAngle + angleStep * clusterIndex + angleStep * 0.5;

		const innerRadius = ringIndex * ringWidth;
		const outerRadius = (ringIndex + 1) * ringWidth;
		const r = innerRadius + (outerRadius - innerRadius) * 0.5;

		return {
			x: r * Math.cos(angle),
			y: r * Math.sin(angle),
		};
	};
}

function spiralPlacement(options: PlacementOptions = {}): PlacementStrategy {
	return (radar, entry, ringWidth) => {
		const section = radar.sections.find((s) => s.id === entry.sectionId);
		const ringIndex = radar.rings.findIndex((r) => r.id === entry.ringId);

		if (!section) return { x: 0, y: 0 };

		const spiralStep = options.spiralStep ?? 0.1;
		const entriesInSection = radar.entries.filter(
			(e) => e.sectionId === entry.sectionId,
		);
		const position = entriesInSection.indexOf(entry);

		const startAngle =
			section.startAngle ??
			radar.sections.findIndex((s) => s.id === entry.sectionId) *
				((2 * Math.PI) / radar.sections.length);

		const angle = startAngle + position * spiralStep;
		const innerRadius = ringIndex * ringWidth;
		const outerRadius = (ringIndex + 1) * ringWidth;
		const r = innerRadius + ((position % 5) * (outerRadius - innerRadius)) / 5;

		return {
			x: r * Math.cos(angle),
			y: r * Math.sin(angle),
		};
	};
}

function placementStrategy(strategy: RadarConfig["entryPlacement"]) {
	switch (strategy) {
		case "random":
			return randomPlacement();
		case "distributed":
			return distributedPlacement();
		case "clustered":
			return clusteredPlacement();
		case "spiral":
			return spiralPlacement();
		default:
			return randomPlacement();
	}
}
