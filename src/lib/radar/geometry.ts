import type { Container, Radar } from "~/types/radar.js";

export function calculateGeometry(container: Container) {
	const radius = Math.min(container.width, container.height) / 2;


	return {
		radius,
		
		center: {
			x: container.width / 2,
			y: container.height / 2,
		},
	};
}

