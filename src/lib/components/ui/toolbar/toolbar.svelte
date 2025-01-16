<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Snippet } from 'svelte';


  type Props = {
    children: Snippet;
    class?: string;
  };

  const { children, class: clazz }: Props = $props();
</script>

<nav
  class={cn(
    'bg-background backdrop-blur-sm shadow-lg border rounded-lg',

    clazz
  )}
>
  {@render children()}
</nav>
