<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    class?: string;
  };

  const { children, class: clazz }: Props = $props();
</script>

<section class={cn('grid gap-1', clazz)}>
  {@render children()}
</section>
