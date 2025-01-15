import type { Entry } from "$lib/radar/core/elements/types.js";

export const layerEvents = ["entry/highlight"] as const;

export type LayerEvent = (typeof layerEvents)[number];

export type LayerEventPayload = {
	"entry/highlight": {
		entryId: Entry["id"];
		highlight: boolean;
	};
};

export interface Dispatcher {
	dispatch: <T extends LayerEvent>(
		event: T,
		payload: LayerEventPayload[T],
	) => void;
	on: <T extends LayerEvent>(
		event: T,
		callback: (payload: LayerEventPayload[T]) => void,
	) => void;
}
