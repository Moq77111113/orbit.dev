type RingId = `rng-${number}`;
type SectionId = `sec-${number}`;

export type Container = { width: number; height: number };
export type Ring = {
  id: RingId;
  name: string;
  color?: string;
};

export type Section = {
  id: SectionId;
  name: string;
  color?: string;
  startAngle?: number;
  endAngle?: number;
};

export type Entry = {
  name: string;
  sectionId: SectionId;
  ringId: RingId;
  isNew?: boolean;
  description?: string;
  link?: string;
  tags?: string[];
  moved?: 1 | 0 | -1;
};

export type Radar = {
  title: string;
  rings: Ring[];
  sections: Section[];
  entries: Entry[];
};

export type Target = d3.Selection<SVGGElement, unknown, null, undefined>;

export type Geometry = {
  radius: number;
  center: { x: number; y: number };
};

export type DrawOptions = {
  geometry: Geometry;
  radar: Radar;
};
export type DrawFunction = (target: Target, options: DrawOptions) => void;
