<script lang="ts" generics="T">
  import { cn } from '$lib/utils/ui.js';
  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    children: Snippet;
  };

  const { class: clazz, children }: Props = $props();
</script>

<ul class={cn('flex flex-col gap-2', clazz)}>
  {@render children()}
</ul>
