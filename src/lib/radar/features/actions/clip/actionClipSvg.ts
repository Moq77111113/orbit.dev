import { register } from "$lib/radar/features/actions/register.js";

import type { AppState } from "$lib/radar/state/types.js";
import { clip } from "$lib/utils/clip.js";

type ExportSvgData = SVGElement;

export const clipSvg = register({
	name: "clip/svg",
	label: "Copy Radar to clipboard as svg",
	keywords: ["radar", "copy", "svg"],
	perform: (_state: AppState, svg: ExportSvgData) => {
		const svgData = new XMLSerializer().serializeToString(svg);
		clip?.(svgData);

		return false;
	},
});
