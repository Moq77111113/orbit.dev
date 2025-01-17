import type * as d3 from "d3";
import { D3Dispatcher } from "../events/dispatcher.js";
import type { Context, D3Selection, Dimensions } from "./types.js";

type LayerProps = {
	id: string;
	parent: D3Selection<SVGElement, unknown>;
	context: Context;
};

export abstract class Layer<Data, SVGType extends d3.BaseType = d3.BaseType> {
	protected readonly parent: D3Selection<SVGElement, unknown>;

	protected data: Data[] = [];
	protected layer: d3.Selection<SVGGElement, unknown, null, undefined>;

	private context: Context;

	protected dispatcher = D3Dispatcher.create();

	constructor(props: LayerProps) {
		this.parent = props.parent;
		this.context = props.context;

		this.layer = this.parent.append("g").attr("class", `lyr-${props.id}`);
	}

	protected compare(a: Data, b: Data) {
		return a === b;
	}

	protected abstract getOne(data: Data): D3Selection<SVGType, Data> | null;

	protected abstract getOrCreate(data: Data): D3Selection<SVGType, Data>;

	protected abstract applyAttributes(
		element: D3Selection<SVGType, Data>,
		index: number,
	): void;

	protected removeOne(data: Data) {
		const element = this.getOne(data);

		if (element) {
			element.remove();
		}
	}

	protected get dimensions() {
		return this.context.dimensions;
	}

	protected get config() {
		return this.context.config;
	}

	protected get radar() {
		return this.context.radar;
	}

	protected render() {
		const { x, y } = {
			x: this.dimensions.width / 2,
			y: this.dimensions.height / 2,
		};

		this.layer.attr("transform", `translate(${x}, ${y})`);

		for (const [idx, data] of this.data.entries()) {
			const element = this.getOrCreate(data);
			this.applyAttributes(element, idx);
		}
	}

	update(context: Context, newData: Data[]) {
		this.context = context;

		const removed = this.data.filter(
			(d) => !newData.some((n) => this.compare(d, n)),
		);

		if (removed.length) {
			for (const data of removed) {
				this.removeOne(data);
			}
		}

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
