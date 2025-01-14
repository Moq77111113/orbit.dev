<script lang="ts">
  import type { RadarEntryPlacement } from '$lib/radar/core/config/types.js';
  import { changeLayout } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import { cn } from '$lib/utils/ui.js';

  import EntryStrategyButton from '../../atoms/entry-strategy.button.svelte';

  const radar = useRadar();

  const strategies = [
    'random',
    'distributed',
    'clustered',
    'spiral',
  ] as const satisfies RadarEntryPlacement[];

  const current = $derived(radar.state.radarConfig.entryPlacement);
</script>

<div class={cn('grid grid-cols-2 gap-2')}>
  {#each strategies as strategy}
    <EntryStrategyButton
      selected={strategy === current}
      onclick={() => radar.execute(changeLayout, { layout: strategy })}
      class="w-full">{strategy}</EntryStrategyButton
    >
  {/each}
</div>
