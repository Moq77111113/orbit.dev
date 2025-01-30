<script lang="ts">
import { ZoomController } from "$lib/hooks/svg-zoom.svelte.js";
import { useOrbit } from "$lib/radar/state/app-state.svelte.js";
import { RadarRenderer } from "$lib/radar/state/observers/renderer.svelte.js";

import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
import { useBackgroundStore } from "$lib/hooks/svg-background.svelte.js";
import { onMount } from "svelte";
import RadarSvg from "../molecules/radar-svg.svelte";
import ZoomControls from "../molecules/zoom-controls.svelte";

const orbit = useOrbit();
const background = useBackgroundStore();

type Props = { svg: SVGElement };

let { svg = $bindable() }: Props = $props();
const zoomController = new ZoomController();
let renderer = $state<RadarRenderer>();

function handleResize() {
	const targetWidth = Math.min(
		zoomController.maxWidth,
		window.innerWidth * 0.8,
	);

	zoomController.resize(targetWidth);
}

function handleZoom(inside: boolean, position: { x: number; y: number }) {
	zoomController.handleZoom(
		inside ? zoomController.zoomStep : -zoomController.zoomStep,
		position,
	);
}

onMount(() => {
	if (!renderer) {
		renderer = new RadarRenderer({
			target: svg,
			container: { width: zoomController.width, height: zoomController.height },
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
  onmousemove={(e) => zoomController.handleMouseMove(e.clientX, e.clientY)}
  onmouseup={() => zoomController.handleMouseUp()}
  onmouseleave={() => zoomController.handleMouseUp()}
  ontouchmove={(e) =>
    zoomController.handleMouseMove(e.touches[0].clientX, e.touches[0].clientY)}
  ontouchend={() => zoomController.handleMouseUp()}
/>

<div class="flex flex-col-reverse gap-4">
  <ZoomControls
  class="flex-row"
  onZoom={handleZoom}
  onReset={() => zoomController.reset()}
  scale={zoomController.scale}
  max={zoomController.maxZoom}
  min={zoomController.minZoom}
/>

<div class="w-full flex justify-center relative">
  <RadarSvg
    bind:svg
    width={zoomController.width}
    height={zoomController.height}
    viewBox={zoomController.viewBox}
    scale={zoomController.scale}
    onMouseDown={(x, y) => zoomController.handleMouseDown(x, y)}
    background={background.value}
    zoom={handleZoom}
 />
 
</div>
</div>