<script lang="ts">
  import ToggleGroup from '$lib/components/shared/molecules/toggle-group.svelte';
  import type { RadarEntryPlacement } from '$lib/radar/core/config/types.js';
  import { changeLayout } from '$lib/radar/features/actions/index.js';
  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';

  const orbit = useOrbit();

  const placements = [
    'random',
    'distributed',
    'clustered',
    'spiral',
  ] as const satisfies RadarEntryPlacement[];
</script>

<ToggleGroup
  items={placements}
  selected={orbit.state.radarConfig.entryPlacement}
  onToggle={(placement) => {
    orbit.execute(changeLayout, { layout: placement });
  }}
/>
