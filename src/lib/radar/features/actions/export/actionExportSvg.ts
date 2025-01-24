import { register } from "$lib/radar/features/actions/register.js";

import type { AppState } from "$lib/radar/state/types.js";
import { download } from "$lib/utils/download.js";

type ExportSvgData = SVGElement;

export const exportSvg = register({
	name: "export/svg",
	label: "Export Radar as SVG",
	keywords: ["radar", "export", "svg", "download"],
	perform: (_state: AppState, svg: ExportSvgData) => {
		const svgData = new XMLSerializer().serializeToString(svg);
		const svgBlob = new Blob([svgData], {
			type: "image/svg+xml;charset=utf-8",
		});
		download(svgBlob, "radar.svg");
		return false;
	},
});
