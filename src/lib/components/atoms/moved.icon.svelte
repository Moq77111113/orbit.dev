<script lang="ts" module>
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import { type VariantProps, tv } from 'tailwind-variants';

  const variants = tv({
    base: 'size-3',
    variants: {
      variant: {
        up: 'text-green-600 rotate-180',
        down: 'text-red-600',
        none: '',
      },
      color: {
        black: 'text-black',
        default: '',
      },
    },
    defaultVariants: {
      variant: 'none',
      color: 'default',
    },
  });

  type Variant = VariantProps<typeof variants>['variant'];
  type Color = VariantProps<typeof variants>['color'];
</script>

<script lang="ts">
  import Minus from 'lucide-svelte/icons/minus';
  import { cn } from '$lib/utils/ui.js';

  type Props = {
    variant: Variant;
    color?: Color;
    class?: string;
  };

  const { variant, color, class: clazz }: Props = $props();
</script>

{#if variant === 'none'}
  <Minus class={cn(variants({ variant, color }), clazz)} />
{:else}
  <ArrowDown class={cn(variants({ variant, color }), clazz)} />
{/if}
