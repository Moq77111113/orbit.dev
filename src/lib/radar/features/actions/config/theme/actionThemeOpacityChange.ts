import type { RadarTheme } from "$lib/radar/core/config/types.js";

import { register } from "$lib/radar/features/actions/register.js";
import type { AppState } from "$lib/radar/state/types.js";
import { deepMerge } from "../common/common.js";
import type { ValueOf } from "../common/types.js";

type Opacity = keyof ValueOf<RadarTheme, "opacity">;

type ChangeThemeOpacityData = { key: Opacity; opacity: number };

export const changeThemeOpacity = register({
	name: "theme/opacity-update",
	label: "Change Theme Opacity",
	keywords: ["config", "theme", "opacity", "update"],
	perform: (state: AppState, data: ChangeThemeOpacityData) => {
		const { opacity, key } = data;

		const config = deepMerge(
			state.radarConfig,
			`theme.opacity.${key}`,
			opacity,
		);

		return {
			appState: {
				radarConfig: config,
			},
		};
	},
});
