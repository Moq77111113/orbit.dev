<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '~/lib/utils/ui.js';

  type Props = {
    title: string;
    children?: Snippet;
    class?: string;
  };

  const { title, children, class: clazz }: Props = $props();
</script>

<li class={cn('flex justify-between items-center')}>
  <span class={cn('ml-2 text-sm font-medium text-gray-900', clazz)}
    >{title}</span
  >
  {@render children?.()}
</li>
