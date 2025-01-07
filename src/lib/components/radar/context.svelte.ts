import type {
	RadarEntryPlacement,
	RadarTheme,
} from "$lib/radar/config/types.js";
import { RadarService } from "$lib/radar/radar.js";
import { getContext, setContext } from "svelte";
import type { Entry, Radar, Ring, Section } from "~/types/radar.js";

type RadarStateProps = {
	radar: Radar;
};

class RadarState {
	readonly props: RadarStateProps;

	#placement = $state<RadarEntryPlacement>("random");
	#rings = $state<Ring[]>([]);
	#section = $state<Section[]>([]);
	#entries = $state<Entry[]>([]);
	#service: RadarService;
	#target: SVGElement | null = null;

	constructor(props: RadarStateProps) {
		this.props = props;
		this.#service = new RadarService(props.radar);
		this.#rings = this.props.radar.rings;
		this.#section = this.props.radar.sections;
		this.#entries = this.props.radar.entries;
	}

	bindTarget(target: SVGElement) {
		this.#target = target;
		this.#service.draw(this.#target);
	}

	changeTheme(theme: RadarTheme) {
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

	updateRing(ring: Ring) {
		this.#rings = this.#service.updateRing(ring);
	}

	removeRing(ring: Ring) {
		this.#rings = this.#service.removeRing(ring);
	}

	addOrUpdateEntry(entry: Entry) {
		if (this.#entries.find((e) => e.id === entry.id)) {
			this.#entries = this.#service.updateEntry(entry);
			return;
		}

		this.#entries.push(this.#service.addEntry(entry));
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

	get enrichedRadar() {
		const sectionCache = new Map<string, Section>();
		const ringCache = new Map<string, Ring>();
		return this.#entries.reduce<
			{ entry: Entry; section: Section; ring: Ring }[]
		>((acc, entry) => {
			const section =
				sectionCache.get(entry.sectionId) ??
				this.#section.find((s) => s.id === entry.sectionId);

			const ring =
				ringCache.get(entry.ringId) ??
				this.#rings.find((r) => r.id === entry.ringId);

			if (section) {
				sectionCache.set(entry.sectionId, section);
			}

			if (ring) {
				ringCache.set(entry.ringId, ring);
			}

			if (section && ring) {
				acc.push({ entry, section, ring });
			}

			return acc;
		}, []);
	}

	get entriesPerSection() {
		const sectionCache = new Map<string, Section>();
		const ringCache = new Map<string, Ring>();
		return this.#entries.reduce<
			Record<Section["name"], { entry: Entry; section: Section; ring: Ring }[]>
		>((acc, entry) => {
			const section =
				sectionCache.get(entry.sectionId) ??
				this.#section.find((s) => s.id === entry.sectionId);
			const ring =
				ringCache.get(entry.ringId) ??
				this.#rings.find((r) => r.id === entry.ringId);

			if (!section || !ring) {
				return acc;
			}
			if (!acc[section.name]) {
				acc[section.name] = [];
			}

			acc[section.name].push({ entry, section, ring });

			return acc;
		}, {});
	}
}

const SYMBOL_KEY = "orb-radar";

export function createRadarState(props: RadarStateProps) {
	return setContext(Symbol.for(SYMBOL_KEY), new RadarState(props));
}

export function useRadar(): RadarState {
	return getContext(Symbol.for(SYMBOL_KEY));
}
