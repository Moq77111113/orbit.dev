<script lang="ts">
  import { onMount } from 'svelte';
  import { useRadar } from './context.svelte.js';
  type Props = {
    width?: number;
    height?: number;
  };
  let { width = $bindable(800), height = $bindable(800) }: Props = $props();

  const radar = useRadar();

  let svg: SVGElement;

  onMount(() => {
    radar.bindTarget(svg);
  });

  $effect(() => {
    radar.resize({
      width: width,
      height: height,
    });
  });
</script>

<svg
  id="radar-svg"
  class="relative"
  bind:this={svg}
  {width}
  {height}
  viewBox={`0 0 ${width} ${height}`}
/>
