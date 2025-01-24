import ArrowDownToLine from "lucide-svelte/icons/arrow-down-to-line";
import ArrowLeft from "lucide-svelte/icons/arrow-left";
import Layout from "lucide-svelte/icons/layout-grid";
import Hamburger from "lucide-svelte/icons/menu";
import ThemeSystem from "lucide-svelte/icons/monitor-smartphone";
import Moon from "lucide-svelte/icons/moon";
import Palette from "lucide-svelte/icons/palette";
import Puzzle from "lucide-svelte/icons/puzzle";
import Radar from "lucide-svelte/icons/radar";
import Radius from "lucide-svelte/icons/radius";
import Settings from "lucide-svelte/icons/settings";
import Share from "lucide-svelte/icons/share-2";
import Shell from "lucide-svelte/icons/shell";
import Sun from "lucide-svelte/icons/sun";
import Trash from "lucide-svelte/icons/trash-2";
import X from "lucide-svelte/icons/x";
import Shuffle from 'lucide-svelte/icons/shuffle';
import GitHub from "./github.svelte";
import Logo from "./logo.svelte";
import Transparent from "./transparent.svelte";

export const Icons = {
	logo: Logo,
	github: GitHub,
	transparent: Transparent,
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
	download: ArrowDownToLine,
	trash: Trash,
	share: Share,
	shuffle: Shuffle,
	themelight: Sun,
	themedark: Moon,
	themesys: ThemeSystem,
};
