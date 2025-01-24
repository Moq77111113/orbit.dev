<script lang="ts" module>
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import { type VariantProps, tv } from 'tailwind-variants';

  const variants = tv({
    base: 'size-3',
    variants: {
      variant: {
        '1': 'text-green-600 rotate-180',
        '-1': 'text-red-600',
        '0': '',
      },
   
    },
    defaultVariants: {
      variant: '0',

    },
  });

  type Variant = VariantProps<typeof variants>['variant'];

</script>

<script lang="ts">
  import Minus from 'lucide-svelte/icons/minus';
  import { cn } from '$lib/utils/ui.js';

  type Props = {
    variant: Variant;

    class?: string;
  };

  const { variant, class: clazz }: Props = $props();
</script>

{#if variant === '0'}
  <Minus class={cn(variants({ variant }), clazz)} />
{:else}
  <ArrowDown class={cn(variants({ variant }), clazz)} />
{/if}
