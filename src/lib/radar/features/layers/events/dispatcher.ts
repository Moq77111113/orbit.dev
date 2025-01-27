import * as d3 from "d3";
import {
	type Dispatcher,
	type LayerEvent,
	type LayerEventPayload,
	layerEvents,
} from "./types.js";

export class D3Dispatcher implements Dispatcher {
	private static instance: D3Dispatcher;

	private d3Dispatch = d3.dispatch<LayerEventPayload>(...layerEvents);

	private constructor() {}

	public static create() {
		if (!D3Dispatcher.instance) {
			D3Dispatcher.instance = new D3Dispatcher();
		}
		return D3Dispatcher.instance;
	}

	dispatch<T extends LayerEvent>(event: T, payload: LayerEventPayload[T]) {
		this.d3Dispatch.call(event, undefined, payload);
	}

	on<T extends LayerEvent>(
		event: T,
		callback: (payload: LayerEventPayload[T]) => void,
	) {
		this.d3Dispatch.on(event, callback);
	}
}
