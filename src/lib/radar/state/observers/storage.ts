import type { Radar } from "$lib/radar/core/elements/types.js";
import { radarSchema } from "$lib/validators/radar.validator.js";
import { ORBIT_RADAR } from "../data/constants.js";
import type { AppState } from "../types.js";
import type { StateObserver } from "./types.js";

type StorageProps = {};

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
	}

	clear(): void {
		this.#storage.removeItem(ORBIT_RADAR);
	}

	load(): Radar | null {
		const item = this.#storage.getItem(ORBIT_RADAR);
		if (!item) return null;

		const result = radarSchema.safeParse(JSON.parse(item));
		if (result.success) {
			return result.data;
		}

		this.clear();

		return null;
	}
}
