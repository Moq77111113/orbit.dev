<script lang="ts">
  import { onMount } from 'svelte';
  import type { Radar } from '~/types/radar.js';
  import { RadarService } from '../radar/radar.js';

  type Props = {
    data: Radar;
    width?: number;
    height?: number;
  };
  const { data, width = 800, height = 800 }: Props = $props();
  const radar = new RadarService(data, {
    container: { width, height },
  });
  let svg: SVGElement;

  onMount(() => {
    radar.draw(svg);
  });
</script>

<svg bind:this={svg} {width} {height} viewBox={`0 0 ${width} ${height}`} />
