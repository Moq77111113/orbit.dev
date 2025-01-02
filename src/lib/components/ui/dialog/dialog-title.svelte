<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Dialog as DialogPrimitive } from 'bits-ui';

  const {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
  bind:ref
  class={cn('text-lg font-semibold leading-none tracking-tight', className)}
  {...restProps}
/>
