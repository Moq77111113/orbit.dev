<script lang="ts">
  import IconButton from '$lib/components/shared/atoms/icon-button.svelte';
  import { cn } from '$lib/utils/ui.js';
  import MoveHorizontal from 'lucide-svelte/icons/move-horizontal';
  import ZoomIn from 'lucide-svelte/icons/zoom-in';
  import ZoomOut from 'lucide-svelte/icons/zoom-out';

  type Props = {
    scale: number;
    min: number;
    max: number;

    onZoom: (inside: boolean, position: { x: number; y: number }) => void;
    onReset: () => void;
    class?: string;
  };

  let {
    scale = $bindable(),
    min,
    max,
    onZoom,
    onReset,
    class: clazz,
  }: Props = $props();
</script>

<div class={cn('flex flex-col items-center gap-2', clazz)}>
  <IconButton
    icon={ZoomIn}
    aria-label="Zoom in"
    onclick={(e) => onZoom(true, { x: e.clientX, y: e.clientY })}
    disabled={scale >= max}
  />
  <IconButton icon={MoveHorizontal} aria-label="Reset" onclick={() => onReset()} />
  <IconButton
    icon={ZoomOut}
    aria-label="Zoom out"
    onclick={(e) => onZoom(false, { x: e.clientX, y: e.clientY })}
    disabled={scale <= min}
  />
</div>
