<script lang="ts">
  import Button from '../../ui/button/button.svelte';
  import { useRadar } from '../context.svelte.js';
  const radar = useRadar();

  const allowedLayouts = [
    'random',
    'distributed',
    'clustered',
    'spiral',
  ] as const;
</script>

<div class="grid grid-cols-2 gap-2">
  {#each allowedLayouts as key}
    <Button
      class="w-full"
      variant={radar.placement === key ? 'default' : 'ghost'}
      onclick={() => radar.changePlacement(key)}>{key}</Button
    >
  {/each}
</div>
