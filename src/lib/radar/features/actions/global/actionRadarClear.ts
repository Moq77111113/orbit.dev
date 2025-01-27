import { emptyRadar } from "$lib/radar/core/elements/init.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { ActionResult } from "$lib/radar/features/actions/types/action-function.js";

export const clearRadar = register({
	name: "radar/clear",
	label: "Clear the Radar",
	keywords: ["radar", "clear"],
	perform: (): ActionResult => {
		return {
			appState: {
				radar: emptyRadar(),
			},
		};
	},
});
