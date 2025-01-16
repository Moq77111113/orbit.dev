import ArrowLeft from "lucide-svelte/icons/arrow-left";
import Layout from "lucide-svelte/icons/layout-grid";
import Hamburger from "lucide-svelte/icons/menu";
import Palette from "lucide-svelte/icons/palette";
import Puzzle from "lucide-svelte/icons/puzzle";
import Radar from "lucide-svelte/icons/radar";
import Radius from "lucide-svelte/icons/radius";
import Settings from "lucide-svelte/icons/settings";
import Shell from "lucide-svelte/icons/shell";
import X from "lucide-svelte/icons/x";
import GitHub from "./github.svelte";
import Logo from "./logo.svelte";

export const Icons = {
	logo: Logo,
	github: GitHub,
	hamburger: Hamburger,
	radar: Radar,
	theme: Palette,
	layout: Layout,
	settings: Settings,
	section: Radius,
	ring: Shell,
	entry: Puzzle,
	close: X,
	left: ArrowLeft,
};
