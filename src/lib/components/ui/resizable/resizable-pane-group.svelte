<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import * as ResizablePrimitive from 'paneforge';

  let {
    ref = $bindable(null),
    class: className,
    direction,
    this: paneGroup = $bindable(),
    ...restProps
  }: ResizablePrimitive.PaneGroupProps & {
    this?: ResizablePrimitive.PaneGroup;
  } = $props();
</script>

<ResizablePrimitive.PaneGroup
  bind:ref
  bind:this={paneGroup}
  {direction}
  class={cn('flex h-full w-full data-[direction=vertical]:flex-col', className)}
  {...restProps}
/>
