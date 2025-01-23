<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    svg: SVGElement;
    width: number;
    height: number;
    viewBox: string;
    scale: number;
    background?: string;
    onMouseDown: (x: number, y: number) => void;
    zoom: (inside: boolean, position: { x: number; y: number }) => void;

    children?: Snippet;
  };

  let {
    svg = $bindable(),
    width,
    height,
    viewBox,
    scale,
    background = 'transparent',
    onMouseDown,
    zoom,
    children,
  }: Props = $props();

  function handleMouseDown(event: MouseEvent) {
    onMouseDown(event.clientX, event.clientY);
  }

  function handleTouch(event: TouchEvent) {
    const touches = event.touches;
    if (touches.length <= 1) {
      onMouseDown(touches[0].clientX, touches[0].clientY);
      return;
    }
    console.log('pinch');
    handlePinch(event);
  }

  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    zoom(event.deltaY < 0, { x: event.clientX, y: event.clientY });
  }

  function handlePinch(event: TouchEvent) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    if (!touch1 || !touch2) return;
    const x = (touch1.clientX + touch2.clientX) / 2;
    const y = (touch1.clientY + touch2.clientY) / 2;
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    zoom(distance > 0, { x, y });
  }
</script>

<div
  role="button"
  tabindex="0"
  onmousedown={handleMouseDown}
  ontouchstart={handleTouch}
  ontouchmove={handlePinch}
  class:cursor-grab={scale > 1}
  class="cursor-default"
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
    style={`--bg: ${background}`}
    class="font-serif bg-[--bg]"
    
  />
  {@render children?.()}
</div>
