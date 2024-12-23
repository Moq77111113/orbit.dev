<script lang="ts">
  import { onMount } from 'svelte';
  import type { Radar } from '~/types/radar.js';
  import { RadarService } from '../radar/radar.js';

  type Props = {
    data: Radar;
    width?: number;
    height?: number;
  };
  const {
    data,
    width: baseWidth = 800,
    height: baseHeight = 800,
  }: Props = $props();

  let width = $state(baseWidth);
  let height = $state(baseHeight);

  const radar = new RadarService(data, {
    container: {
      get width() {
        return width;
      },
      get height() {
        return height;
      },
    },
  });
  let svg: SVGElement;

  onMount(() => {
    radar.draw(svg);
  });

  $effect(() => {
    radar.resize({
      width: width,
      height: height,
    });
  });
</script>

<svg
  class="relative"
  bind:this={svg}
  {width}
  {height}
  viewBox={`0 0 ${width} ${height}`}
/>

<style>
</style>
