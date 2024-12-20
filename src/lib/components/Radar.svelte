<script lang="ts">
  import { drawRadar } from '$lib/radar.js';
  import { onMount } from 'svelte';
  import type { Radar } from '~/types/radar.js';

  type Props = {
    data: Radar;
    width?: number;
    height?: number;
  };
  const { data, width = 800, height = 800 }: Props = $props();

  let svg: SVGElement;

  onMount(() => drawRadar(svg, { radar: data, container: { width, height } }));
</script>

<svg bind:this={svg} {width} {height} viewBox={`0 0 ${width} ${height}`} />
