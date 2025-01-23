<script lang="ts">
  import type { SliderProps } from '$lib/components/shared/molecules/labeled-slider.svelte';
  import type { RadarTheme } from '$lib/radar/core/config/types.js';
  import {
    changeThemeColor,
    changeThemeSize,
  } from '$lib/radar/features/actions/index.js';
  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';

  import Colors from '../molecules/colors.svelte';
  import Sizes from '../molecules/sizes.svelte';

  const orbit = useOrbit();
  const theme = $derived(orbit.state.radarConfig.theme);

  const sizes = $derived({
    entry: {
      min: 10,
      max: 100,
      step: 5,
      label: 'entry',
      value: theme.sizes.entry,
    },
    strokeWidth: {
      min: 1,
      max: 5,
      step: 1,
      label: 'stroke',
      value: theme.sizes.strokeWidth,
    },
  }) satisfies Record<keyof RadarTheme['sizes'], Omit<SliderProps, 'onchange'>>;
</script>

<Colors
  colors={theme.colors}
  onChange={(key, color) => {
    orbit.execute(changeThemeColor, { key, color });
  }}
/>

<Sizes
  {sizes}
  onChange={(key, size) => {
    orbit.execute(changeThemeSize, { key, size });
  }}
/>
