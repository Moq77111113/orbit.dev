<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { RadarRenderer } from '$lib/radar/state/observers/renderer.svelte.js';
  import { useOrbit } from '$lib/radar/state/state.svelte.js';
  import MoveHorizontal from 'lucide-svelte/icons/move-horizontal';
  import ZoomIn from 'lucide-svelte/icons/zoom-in';
  import ZoomOut from 'lucide-svelte/icons/zoom-out';
  import { onMount } from 'svelte';
  const orbit = useOrbit();

  type Props = { svg: SVGElement };

  let { svg = $bindable() }: Props = $props();

  let renderer = $state<RadarRenderer>();
  const VIEW_WIDTH = 1000;
  const VIEW_HEIGHT = 800;
  const MAX_WIDTH = 1000;
  const ASPECT_RATIO = 0.8;
  let scale = $state(1);
  let offset = $state({ x: 0, y: 0 });
  let isDragging = $state(false);
  let dragStart = $state({ x: 0, y: 0 });
  let startOffset = $state({ x: 0, y: 0 });

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.1;
  let { width, height } = $state({ width: 1000, height: 1000 * ASPECT_RATIO });
  let viewBox = $state(`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`);

  function handleZoom(delta: number) {
    const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale + delta));
    if (newScale !== scale) {
      const centerX = VIEW_WIDTH / 2 + offset.x;
      const centerY = VIEW_HEIGHT / 2 + offset.y;

      const scaleRatio = newScale / scale;
      offset = {
        x: centerX - (centerX - offset.x) * scaleRatio,
        y: centerY - (centerY - offset.y) * scaleRatio,
      };

      scale = newScale;
      updateViewBox();
    }
  }
  function updateViewBox() {
    const scaledWidth = VIEW_WIDTH / scale;
    const scaledHeight = VIEW_HEIGHT / scale;

    const maxOffset = {
      x: VIEW_WIDTH * (1 - 1 / scale),
      y: VIEW_HEIGHT * (1 - 1 / scale),
    };

    offset = {
      x: Math.max(-maxOffset.x, Math.min(maxOffset.x, offset.x)),
      y: Math.max(-maxOffset.y, Math.min(maxOffset.y, offset.y)),
    };

    viewBox = `${-offset.x} ${-offset.y} ${scaledWidth} ${scaledHeight}`;
  }
  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    handleZoom(delta);
  }

  function handleZoomIn() {
    handleZoom(ZOOM_STEP);
  }

  function handleZoomOut() {
    handleZoom(-ZOOM_STEP);
  }

  function resize() {
    width = Math.min(MAX_WIDTH, window.innerWidth - 32);
    height = width * ASPECT_RATIO;
  }

  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    dragStart = {
      x: event.clientX,
      y: event.clientY,
    };
    startOffset = { ...offset };
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;

    const dx = (event.clientX - dragStart.x) * (1 / scale);
    const dy = (event.clientY - dragStart.y) * (1 / scale);

    offset = {
      x: startOffset.x + dx,
      y: startOffset.y + dy,
    };

    updateViewBox();
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function resetView() {
    scale = 1;
    offset = { x: 0, y: 0 };
    updateViewBox();
  }

  onMount(() => {
    if (!renderer) {
      renderer = new RadarRenderer({
        target: svg,
        container: { width: width, height: height },
      });
    }
    orbit.addObserver(renderer);
    resize();
  });
</script>

<svelte:window
  onresize={resize}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseUp}
/>

<div class="w-full flex justify-center relative">
  <div
    role="button"
    tabindex="0"
    onmousedown={handleMouseDown}
    class:cursor-grab={scale > 1}
  >
    <svg
      id="radar"
      xmlns="http://www.w3.org/2000/svg"
      bind:this={svg}
      {width}
      {height}
      {viewBox}
      preserveAspectRatio="xMidYMid meet"
      onwheel={handleWheel}
      role="img"
      aria-label="Tech radar visualization"
    />
  </div>

  <div class="absolute bottom-4 right-4 flex flex-col gap-2">
    <Button
      size="icon"
      variant={'outline'}
      onclick={handleZoomIn}
      disabled={scale >= MAX_ZOOM}
    >
      <ZoomIn class="w-6 h-6" />
    </Button>
    <Button
      size="icon"
      variant={'outline'}
      onclick={handleZoomOut}
      disabled={scale <= MIN_ZOOM}
    >
      <ZoomOut class="w-6 h-6" />
    </Button>
    <Button size="icon" variant={'outline'} onclick={resetView}>
      <MoveHorizontal class="w-6 h-6" />
    </Button>
  </div>
</div>
