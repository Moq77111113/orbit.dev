<script lang="ts">
  import { ZoomController } from '$lib/hooks/svg-zoom.svelte.js';
  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';
  import { RadarRenderer } from '$lib/radar/state/observers/renderer.svelte.js';

  import { useBackgroundStore } from '$lib/hooks/svg-background.svelte.js';
  import { onMount } from 'svelte';
  import RadarSvg from '../molecules/radar-svg.svelte';
  import ZoomControls from '../molecules/zoom-controls.svelte';

  const orbit = useOrbit();
  const background = useBackgroundStore();

  type Props = { svg: SVGElement };

  let { svg = $bindable() }: Props = $props();
  const svgController = new ZoomController();
  let renderer = $state<RadarRenderer>();

  function handleResize() {
    svgController.resize(
      Math.min(svgController.maxWidth, window.innerWidth - 32)
    );
  }

  function handleZoom(inside: boolean, position: { x: number; y: number }) {
    svgController.handleZoom(
      inside ? svgController.zoomStep : -svgController.zoomStep,
      position
    );
  }

  onMount(() => {
    if (!renderer) {
      renderer = new RadarRenderer({
        target: svg,
        container: { width: svgController.width, height: svgController.height },
      });
    }

    if (orbit.readonly) {
      renderer.update(orbit.state);
    } else {
      orbit.addObserver(renderer);
    }

    orbit.bindVector(svg);
    handleResize();
  });
</script>

<svelte:window
  onresize={handleResize}
  onmousemove={(e) => svgController.handleMouseMove(e.clientX, e.clientY)}
  onmouseup={() => svgController.handleMouseUp()}
  onmouseleave={() => svgController.handleMouseUp()}
  ontouchmove={(e) =>
    svgController.handleMouseMove(e.touches[0].clientX, e.touches[0].clientY)}
  ontouchend={() => svgController.handleMouseUp()}
/>

<div class="w-full flex justify-center relative">
  <RadarSvg
    bind:svg
    width={svgController.width}
    height={svgController.height}
    viewBox={svgController.viewBox}
    scale={svgController.scale}
    onMouseDown={(x, y) => svgController.handleMouseDown(x, y)}
    background={background.value}
    zoom={handleZoom}
  >
    <ZoomControls
      class="absolute bottom-0 right-0 mt-4 mr-4"
      onZoom={handleZoom}
      onReset={() => svgController.reset()}
      scale={svgController.scale}
      max={svgController.maxZoom}
      min={svgController.minZoom}
    /></RadarSvg
  >
</div>
