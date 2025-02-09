import ArrowDownToLine from "lucide-svelte/icons/arrow-down-to-line";
import ArrowLeft from "lucide-svelte/icons/arrow-left";
import Braces from "lucide-svelte/icons/braces";
import ChevronEllipsis from "lucide-svelte/icons/chevrons-left-right-ellipsis";
import Copy from "lucide-svelte/icons/copy";
import Image from "lucide-svelte/icons/image";
import Layout from "lucide-svelte/icons/layout-grid";
import Hamburger from "lucide-svelte/icons/menu";
import ThemeSystem from "lucide-svelte/icons/monitor-smartphone";
import Moon from "lucide-svelte/icons/moon";
import Palette from "lucide-svelte/icons/palette";
import Plus from "lucide-svelte/icons/plus";
import Puzzle from "lucide-svelte/icons/puzzle";
import Radar from "lucide-svelte/icons/radar";
import Radius from "lucide-svelte/icons/radius";
import Settings from "lucide-svelte/icons/settings";
import Share from "lucide-svelte/icons/share-2";
import Shell from "lucide-svelte/icons/shell";
import Shuffle from "lucide-svelte/icons/shuffle";
import Sun from "lucide-svelte/icons/sun";
import Trash from "lucide-svelte/icons/trash-2";
import X from "lucide-svelte/icons/x";
import GitHub from "./github.svelte";
import Logo from "./logo.svelte";
import Transparent from "./transparent.svelte";
import Pencil from "lucide-svelte/icons/pencil-line";
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
	plus: Plus,
	share: Share,
	shuffle: Shuffle,
	themelight: Sun,
	themedark: Moon,
	themesys: ThemeSystem,
	copy: Copy,
	json: Braces,
	svg: ChevronEllipsis,
	png: Image,
	pencil: Pencil
};
