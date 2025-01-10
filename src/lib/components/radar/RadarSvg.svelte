<script lang="ts">
  import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';
  import { RadarRenderer } from '$lib/radar/state/observers/state-observer.svelte.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import { onMount } from 'svelte';

  type Props = {
    maxWidth?: number;
    aspectRatio?: number;
  };
  const { maxWidth = $bindable(800), aspectRatio = $bindable(1) }: Props =
    $props();

  const radar = useRadar();

  let svg: SVGElement;
  let renderer = $state<RadarRenderer>();

  const isMobile = new IsMobile();

  let { width, height } = $state({ width: 0, height: 0 });

  $effect(() => {
    if (renderer) {
      renderer.resize({
        width: isMobile.current ? Math.min(500, width) : width,
        height: isMobile.current ? Math.min(500, height) : height,
      });
    }
  });

  function resize() {
    width = Math.min(maxWidth, window.innerWidth - 32);
    height = width * aspectRatio;
  }
  onMount(() => {
    if (!renderer) {
      renderer = new RadarRenderer({
        target: svg,
        container: { width: 500, height: 500 },
      });
    }
    radar.addObserver(renderer);
    resize();
  });
</script>

<svelte:window on:resize={resize} />

<div class="relative w-full flex items-center justify-center">
  <svg
    class=" bg-transparent"
    bind:this={svg}
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    preserveAspectRatio="xMidYMid meet"
  />
</div>
