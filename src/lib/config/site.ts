import { Icons } from "../icons/index.js";

export const site = {
	name: "Orbit.dev",
	url: "https://orbit.moqdev.space",
	og: "https://orbit.moqdev.space/cover.svg",
	description: "Build and share your Tech Radar",
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
