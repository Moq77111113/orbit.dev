import { register } from "$lib/radar/features/actions/register.js";

import type { AppState } from "$lib/radar/state/types.js";

export const exportJson = register({
	name: "export/png",
	label: "Export Radar as JSON",
	keywords: ["radar", "export", "json", "download"],
	perform: (state: AppState) => {
		const radar = state.radar;

		const data = JSON.stringify(radar);
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = "radar.json";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);

		return false;
	},
});
