import type * as d3 from "d3";
import type { Context, Dimensions } from "./types.js";

export abstract class Layer<T> {
	protected data: T[] = [];
	protected layer: d3.Selection<SVGGElement, unknown, null, undefined>;

	constructor(
		public readonly id: string,
		protected parent: d3.Selection<SVGElement, unknown, null, undefined>,
		private context: Context,
	) {
		this.layer = parent.append("g").attr("class", `lyr-${id}`);
	}

	abstract render(): void;

	protected get dimensions() {
		return this.context.dimensions;
	}

	protected get config() {
		return this.context.config;
	}

	update(context: Context, newData: T[]) {
		this.context = context;
		this.data = newData;
		this.render();
	}

	clear(): void {
		this.layer.selectAll("*").remove();
	}

	resize(dimensions: Dimensions): void {
		this.context.dimensions = dimensions;

		this.render();
	}
}
