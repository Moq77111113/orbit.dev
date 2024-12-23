<script lang="ts">
  import { onMount } from 'svelte';
  import { useRadar } from './context.svelte.js';
  type Props = {
    width?: number;
    height?: number;
  };
  let { width: baseWidth = 800, height: baseHeight = 800 }: Props = $props();

  const radar = useRadar();
  let width = $state(baseWidth);
  let height = $state(baseHeight);

  let svg: SVGElement;

  onMount(() => {
    radar.bindTarget(svg);
  });

  // $effect(() => {
  //   radar.resize({
  //     width: width,
  //     height: height,
  //   });
  // });
</script>

<svg
  class="relative"
  bind:this={svg}
  {width}
  {height}
  viewBox={`0 0 ${width} ${height}`}
/>
