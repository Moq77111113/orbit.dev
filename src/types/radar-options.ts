export type Container = { width: number; height: number };

export type Geometry = {
  radius: number;
  center: { x: number; y: number };
  corners: [
    topLeft: { x: number; y: number },
    topRight: { x: number; y: number },
    bottomLeft: { x: number; y: number },
    bottomRight: { x: number; y: number }
  ];
};

export type Target = d3.Selection<SVGGElement, unknown, null, undefined>;
