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

  let svg: SVGElement;

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

<section class="flex w-full justify-between">
  <div class="flex flex-col items-center">
    <div class="flex">
      {#each ['random', 'distributed', 'clustered', 'spiral'] as const as layout}
        <button
          class="px-2 py-1 bg-gray-200 rounded-lg m-1"
          onclick={() => radar.changePosition(layout)}
        >
          {layout}
        </button>
      {/each}
    </div>
  </div>
  <svg
    class="relative"
    bind:this={svg}
    {width}
    {height}
    viewBox={`0 0 ${width} ${height}`}
  />
</section>

<style>
</style>
