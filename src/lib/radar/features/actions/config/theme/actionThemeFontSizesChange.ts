import type { RadarTheme } from "$lib/radar/core/config/types.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { AppState } from "$lib/radar/state/types.js";
import { deepMerge } from "../common/common.js";
import type { ValueOf } from "../common/types.js";

type FontSises = keyof ValueOf<RadarTheme, "fontSizes">;

type ChangeThemeFontSizeData = { key: FontSises; size: number };

export const changeThemefontSize = register({
	name: "theme/opacity-update",
	label: "Change Theme Color",
	keywords: ["config", "theme", "font", "update"],
	perform: (state: AppState, data: ChangeThemeFontSizeData) => {
		const { size, key } = data;

		const config = deepMerge(state.radarConfig, `theme.fontSizes.${key}`, size);

		return {
			appState: {
				radarConfig: config,
			},
		};
	},
});
