import type { RadarTheme } from "$lib/radar/core/config/types.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { AppState } from "$lib/radar/state/types.js";
import { deepMerge } from "../common/common.js";
import type { ValueOf } from "../common/types.js";

type Sizes = keyof ValueOf<RadarTheme, "sizes">;

type ChangeThemeSizesData = { key: Sizes; size: number };

export const changeThemeSize = register({
	name: "theme/opacity-update",
	label: "Change Theme Sizes",
	keywords: ["config", "theme", "sizes", "update"],
	perform: (state: AppState, data: ChangeThemeSizesData) => {
		const { size, key } = data;

		const config = deepMerge(state.radarConfig, `theme.sizes.${key}`, size);

		return {
			appState: {
				radarConfig: config,
			},
		};
	},
});
