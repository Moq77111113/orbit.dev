<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Snippet } from 'svelte';

  type Props = {
    title: string | Snippet;
    children?: Snippet;
    class?: string;
  };

  const { title, children, class: clazz }: Props = $props();
</script>

<li class={cn('flex justify-between items-center')}>
  {#if typeof title === 'string'}
    <span class={cn('text-sm font-medium', clazz)}>{title}</span>
  {:else}
    {@render title()}
  {/if}
  {@render children?.()}
</li>
