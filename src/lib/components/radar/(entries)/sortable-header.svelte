<script lang="ts">
  import  Button from '$lib/components/ui/button/button.svelte';
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import ArrowUp from 'lucide-svelte/icons/arrow-up';
  import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
  import type { ComponentProps } from 'svelte';

  let {
    variant = 'ghost',
    label,
    order,
    ...restProps
  }: ComponentProps<typeof Button> & {
    label: string;
    order: false | 'asc' | 'desc';
  } = $props();
</script>

<Button {variant} {...restProps}>
  {label}
  {@const Icon = (() => {
    if (order === 'asc') return ArrowUp;
    if (order === 'desc') return ArrowDown;
    return ArrowUpDown;
  })()}
  <Icon class="ml-2 size-4" />
</Button>
