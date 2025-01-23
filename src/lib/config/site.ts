import { Icons } from "$lib/icons/index.js";

export const site = {
	name: "Orbit.dev",
	url: "",
	og: "",
	description: "Build and share you Tech Radar",
	links: [
		{
			href: "https://github.com/moq77111113/orbit.dev",
			label: "Star us",
			icon: Icons.github,
		},
	],

	keywords: "Technology Radar, Tech Radar, Orbit, Orbit.dev",
};

export type SiteConfig = typeof site;
