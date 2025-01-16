import { register } from "$lib/radar/features/actions/register.js";


import type { AppState } from "$lib/radar/state/types.js";

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
		const svgUrl = URL.createObjectURL(svgBlob);
		const downloadLink = document.createElement("a");
		downloadLink.href = svgUrl;
		downloadLink.download = "radar.svg";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);

		return false;
	},
});
