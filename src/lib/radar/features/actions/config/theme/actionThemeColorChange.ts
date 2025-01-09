import type { RadarTheme } from "$lib/radar/core/config/types.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { AppState } from "$lib/radar/state/types.js";
import { deepMerge } from "../common/common.js";
import type { ValueOf } from "../common/types.js";

type Colors = keyof ValueOf<RadarTheme, "colors">;

type ChangeThemeColorData = { key: Colors; color: string };

export const changeThemeColor = register({
	name: "theme/color-update",
	label: "Change Theme Color",
	keywords: ["config", "theme", "color", "update"],
	perform: (state: AppState, data: ChangeThemeColorData) => {
		const { color, key } = data;

		const config = deepMerge(state.radarConfig, `theme.colors.${key}`, color);

		return {
			appState: {
				radarConfig: config,
			},
		};
	},
});
