import { getContext, setContext } from "svelte";
import { RadarService } from "~/lib/radar/radar.js";
import { defaultTheme } from "~/lib/theme.js";
import type { Radar, Ring, Section } from "~/types/radar.js";
import type { RadarEntryPlacement, RadarTheme } from "~/types/theme.js";

type RadarStateProps = {
	radar: Radar;
};

class RadarState {
	readonly props: RadarStateProps;
	#theme = $state<RadarTheme>(defaultTheme);
	#placement = $state<RadarEntryPlacement>("random");
	#rings = $state<Ring[]>([]);
	#section = $state<Section[]>([]);
	#service: RadarService;
	#target: SVGElement | null = null;

	constructor(props: RadarStateProps) {
		this.props = props;
		this.#service = new RadarService(props.radar);
		this.#rings = this.props.radar.rings;
		this.#section = this.props.radar.sections;
	}

	bindTarget(target: SVGElement) {
		this.#target = target;
		this.#service.draw(this.#target);
	}

	changeTheme(theme: RadarTheme) {
		this.#theme = theme;
		this.#service.changeTheme(theme);
	}

	changePlacement(placement: RadarEntryPlacement) {
		this.#placement = placement;
		this.#service.changePosition(placement);
	}

	resize(width: number, height: number) {
		this.#service.resize({ width, height });
	}

	addRing(name: string) {
		const colorGeneratedRandomly = Math.floor(
			Math.random() * 16777215,
		).toString(16);
		this.#rings.push(
			this.#service.addRing({ name, color: `#${colorGeneratedRandomly}` }),
		);
	}

	addSection(name: string) {
		const colorGeneratedRandomly = Math.floor(
			Math.random() * 16777215,
		).toString(16);
		this.#section.push(
			this.#service.addSection({ name, color: `#${colorGeneratedRandomly}` }),
		);
	}

	moveRing(ring: Ring, direction: -1 | 1) {
		this.#rings = this.#service.moveRing(ring, direction);
	}

	get theme() {
		return this.#service.config.theme;
	}

	get placement() {
		return this.#placement;
	}

	get sections() {
		return this.#section;
	}

	get rings() {
		return this.#rings;
	}
}

const SYMBOL_KEY = "orb-radar";

export function createRadarState(props: RadarStateProps) {
	return setContext(Symbol.for(SYMBOL_KEY), new RadarState(props));
}

export function useRadar(): RadarState {
	return getContext(Symbol.for(SYMBOL_KEY));
}
