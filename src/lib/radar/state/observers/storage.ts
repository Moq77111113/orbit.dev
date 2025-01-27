import type { RadarConfig } from "$lib/radar/core/config/types.js";
import type { Radar } from "$lib/radar/core/elements/types.js";
import { configSchema } from "$lib/validators/radar-config.validator.js";
import { radarSchema } from "$lib/validators/radar.validator.js";
import { ORBIT_RADAR, ORBIT_RADAR_CONFIG } from "../data/constants.js";
import type { AppState } from "../types.js";
import type { StateObserver } from "./types.js";

class NoopStorage implements Storage {
	length = 0;
	clear(): void {
		return;
	}
	getItem(key: string): string | null {
		return null;
	}
	key(index: number): string | null {
		return null;
	}
	removeItem(key: string): void {}
	setItem(key: string, value: string): void {}
}
const isBrowser = typeof window !== "undefined";
function getStorage(): Storage {
	return isBrowser ? window.localStorage : new NoopStorage();
}

export class StorageObserver implements StateObserver {
	#storage = getStorage();

	update(data: AppState): void {
		this.#storage.setItem(ORBIT_RADAR, JSON.stringify(data.radar));
		this.#storage.setItem(ORBIT_RADAR_CONFIG, JSON.stringify(data.radarConfig));
	}

	clear(key?: "radar" | "config"): void {
		if (!key || key === "radar") {
			this.#storage.removeItem(ORBIT_RADAR);
		}
		if (!key || key === "config") {
			this.#storage.removeItem(ORBIT_RADAR_CONFIG);
		}
	}

	#loadRadar(): Radar | null {
		const radar = this.#storage.getItem(ORBIT_RADAR);
		if (!radar) return null;

		const result = radarSchema.safeParse(JSON.parse(radar));
		if (result.success) {
			return result.data;
		}

		this.clear("radar");

		return null;
	}

	#loadConfig(): RadarConfig | null {
		const config = this.#storage.getItem(ORBIT_RADAR_CONFIG);
		if (!config) return null;

		const result = configSchema.safeParse(JSON.parse(config));
		if (result.success) {
			return result.data;
		}

		this.clear("config");
		return null;
	}

	load() {
		const radar = this.#loadRadar();
		const config = this.#loadConfig();

		return { radar, config };
	}
}
