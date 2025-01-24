import { register } from "$lib/radar/features/actions/register.js";

import type { AppState } from "$lib/radar/state/types.js";
import { download } from "$lib/utils/download.js";

export const exportJson = register({
	name: "export/png",
	label: "Export Radar as JSON",
	keywords: ["radar", "export", "json", "download"],
	perform: (state: AppState) => {
		const radar = state.radar;

		const data = JSON.stringify(radar);
		const blob = new Blob([data], { type: "application/json" });
		download(blob, "radar.json");

		return false;
	},
});
