import { register } from "$lib/radar/features/actions/register.js";

import type { AppState } from "$lib/radar/state/types.js";
import { clip } from "$lib/utils/clip.js";

export const clipJson = register({
	name: "clip/json",
	label: "Copy Radar as JSON",
	keywords: ["radar", "clip", "json", "download"],
	perform: (state: AppState) => {
		const data = JSON.stringify(state.radar);
		clip?.(data);
		return false;
	},
});
