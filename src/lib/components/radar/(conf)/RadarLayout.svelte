<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { changeLayout } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';
  const radar = useRadar();

  const allowedLayouts = [
    'random',
    'distributed',
    'clustered',
    'spiral',
  ] as const;
</script>

<div class="grid grid-cols-2 gap-2">
  {#each allowedLayouts as layout}
    <Button
      class="w-full"
      variant={radar.state.radarConfig.entryPlacement === layout
        ? 'default'
        : 'ghost'}
      onclick={() => radar.execute(changeLayout, { layout })}>{layout}</Button
    >
  {/each}
</div>
