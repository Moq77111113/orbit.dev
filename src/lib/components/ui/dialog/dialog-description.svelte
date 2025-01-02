<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Dialog as DialogPrimitive } from 'bits-ui';

  const {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: DialogPrimitive.DescriptionProps = $props();
</script>

<DialogPrimitive.Description
  bind:ref
  class={cn('text-muted-foreground text-sm', className)}
  {...restProps}
/>
