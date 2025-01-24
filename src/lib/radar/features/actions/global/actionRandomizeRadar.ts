import { createRandomRadar } from "$lib/radar/core/elements/stubs.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { ActionResult } from "$lib/radar/features/actions/types/action-function.js";
import { color } from "$lib/utils/color.js";
import { pickRandom } from "$lib/utils/random.js";

export const randomizeRadar = register({
	name: "radar/randomize",
	label: "Randomize the Radar",
	keywords: ["radar", "randomize"],
	perform: (state): ActionResult => {
		const placements = [
			"random",
			"distributed",
			"clustered",
			"spiral",
		] as const;

		return {
			appState: {
				radar: createRandomRadar(),
				radarConfig: {
					...state.radarConfig,
					entryPlacement: pickRandom(placements),
					theme: {
						...state.radarConfig.theme,
						colors: {
							grid: color(),
							text: color(),
						},
					},
				},
			},
		};
	},
});
