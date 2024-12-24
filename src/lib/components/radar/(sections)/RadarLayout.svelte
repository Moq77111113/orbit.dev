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

  let placement = $state(radar.placement);
</script>

<div class="grid grid-cols-2 gap-2">
  {#each allowedLayouts as key}
    <Button
      class="w-full"
      variant={placement === key ? 'default' : 'ghost'}
      onclick={() => (placement = radar.changeLayout(key))}>{key}</Button
    >
  {/each}
</div>
