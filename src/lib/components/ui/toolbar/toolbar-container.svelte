<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { type VariantProps, tv } from 'tailwind-variants';
  import { setToolbar } from './toolbar.svelte.js';

  const toolbarVariant = tv({
    base: 'absolute w-full px-4 max-w-screen-lg mx-auto z-50 rounded-md',
    variants: {
      x: {
        center: 'left-1/2 -translate-x-1/2',
        left: 'left-[--toolbar-padding]',
        right: 'right-[--toolbar-padding]',
      },
      y: {
        top: 'top-[--toolbar-padding]',
        bottom: 'bottom-[--toolbar-padding]',
      },
    },
    defaultVariants: {
      x: 'center',
      y: 'bottom',
    },
  });

  type Variants = VariantProps<typeof toolbarVariant>;

  type Props = Variants & {
    children: Snippet;
    islandOpen?: boolean;
  } & HTMLAttributes<HTMLDivElement>;

  let {
    x,
    y,
    islandOpen = $bindable(false),
    children,
    class: clazz,
    ...rest
  }: Props = $props();

  setToolbar({
    open: () => islandOpen,
    setOpen: (value: boolean) => {
      islandOpen = value;
    },
  });
</script>

<div class={cn(toolbarVariant({ x, y }), clazz)} {...rest}>
  {@render children()}
</div>
