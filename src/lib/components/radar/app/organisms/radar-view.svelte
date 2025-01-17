<script lang="ts">
  import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';
  import { RadarRenderer } from '$lib/radar/state/observers/renderer.svelte.js';
  import { useOrbit } from '$lib/radar/state/state.svelte.js';
  import { onMount } from 'svelte';

  const orbit = useOrbit();

  type Props = { svg: SVGElement };

  let { svg = $bindable() }: Props = $props();

  let renderer = $state<RadarRenderer>();

  const isMobile = new IsMobile();

  let { width, height } = $state({ width: 0, height: 0 });

  let maxWidth = $derived.by(() => (isMobile.current ? 500 : 1000));
  let aspectRatio = $derived.by(() => (isMobile.current ? 1 : 0.8));

  $effect(() => {
    width = Math.min(maxWidth, window.innerWidth - 32);
    height = width * aspectRatio;
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
    orbit.addObserver(renderer);
    resize();
  });
</script>

<svg
  id="radar"
  xmlns="http://www.w3.org/2000/svg"
  bind:this={svg}
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  preserveAspectRatio="xMidYMid meet"
/>
