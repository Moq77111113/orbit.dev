import { register } from "$lib/radar/features/actions/register.js";

import type { AppState } from "$lib/radar/state/types.js";

export const clipJson = register({
	name: "clip/json",
	label: "Copy Radar as JSON",
	keywords: ["radar", "clip", "json", "download"],
	perform: (state: AppState) => {
		const radar = state.radar;
		const data = JSON.stringify(radar);
		navigator.clipboard.writeText(data);
		return false;
	},
});
