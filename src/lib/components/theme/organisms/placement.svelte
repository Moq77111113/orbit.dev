<script lang="ts">
  import ToggleGroup from '$lib/components/shared/molecules/toggle-group.svelte';
  import type { RadarEntryPlacement } from '$lib/radar/core/config/types.js';
  import { changeLayout } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';

  const radar = useRadar();

  const placements = [
    'random',
    'distributed',
    'clustered',
    'spiral',
  ] as const satisfies RadarEntryPlacement[];
</script>

<ToggleGroup
  items={placements}
  selected={radar.state.radarConfig.entryPlacement}
  onToggle={(placement) => {
    radar.execute(changeLayout, { layout: placement });
  }}
/>
