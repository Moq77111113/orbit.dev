import type { RadarConfig } from "~/lib/radar/config/types.js";
import type { Radar } from "~/lib/radar/elements/types.js";

export type Dimensions = {
	width: number;
	height: number;
	radius: number;
};

export type Context = {
	dimensions: Dimensions;
	config: RadarConfig;
	radar: Radar;
};

type AttributeResult =
	| null
	| string
	| number
	| boolean
	| ReadonlyArray<string | number>;

export type Attrbutes<
	SvgType extends d3.BaseType,
	Data,
	K extends string = string,
> = [K, AttributeResult | d3.ValueFn<SvgType, Data, AttributeResult>];

export type D3Selection<SvgType extends d3.BaseType, T> = d3.Selection<
	SvgType,
	T,
	null,
	undefined
>;
