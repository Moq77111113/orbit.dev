import { initRadar } from "$lib/radar/core/elements/init.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { ActionResult } from "$lib/radar/features/actions/types/action-function.js";

export const randomizeRadar = register({
	name: "radar/randomize",
	label: "Randomize the Radar",
	keywords: ["radar", "randomize"],
	perform: (): ActionResult => {
		return {
			appState: {
				radar: initRadar(),
			},
		};
	},
});
