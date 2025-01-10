import type { RadarConfig } from "$lib/radar/core/config/types.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { AppState } from "$lib/radar/state/types.js";
import { deepMerge } from "./common/common.js";

type Layout = RadarConfig["entryPlacement"];

type ChangeLayoutData = { layout: Layout };

export const changeLayout = register({
	name: "config/layout-update",
	label: "Change Layout",
	keywords: ["config", "layout", "update"],
	perform: (state: AppState, data: ChangeLayoutData) => {
		const { layout } = data;

		const config = deepMerge(state.radarConfig, "entryPlacement", layout);

		return {
			appState: {
				radarConfig: config,
			},
		};
	},
});
