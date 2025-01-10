import type { RadarConfig } from "$lib/radar/core/config/types.js";
import type {
	Entry,
	Radar,
	Ring,
	Section,
} from "$lib/radar/core/elements/types.js";
import type { Merge } from "$lib/types/utils.js";

export type Container = {
	width: number;
	height: number;
};
export type Dimensions = Merge<Container, { radius: number }>;

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

export type EnrichedRing = Merge<Ring, { entries: Entry[] }>;

export type EnrichedSection = Merge<Section, { rings: EnrichedRing[] }>;
