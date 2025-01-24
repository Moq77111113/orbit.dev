import { register } from "$lib/radar/features/actions/register.js";



type ExportPngData = SVGElement;

export const exportPng = register({
	name: "export/png",
	label: "Export Radar as PNG",
	keywords: ["radar", "export", "png", "download"],
	perform: (_state, svg: ExportPngData) => {

		const svgData = new XMLSerializer().serializeToString(svg);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Failed to get canvas 2d context");
		const img = new Image();
		const svgBlob = new Blob([svgData], {
			type: "image/svg+xml;charset=utf-8",
		});
		const svgUrl = URL.createObjectURL(svgBlob);

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			const pngUrl = canvas.toDataURL("image/png");
			const downloadLink = document.createElement("a");
			downloadLink.href = pngUrl;
			downloadLink.download = "radar.png";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		};

		img.src = svgUrl;

		return false;
	},
});
