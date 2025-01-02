<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import { cn } from '~/lib/utils/ui.js';

  type Props = {
    class?: string;
    children: Snippet;
  };

  const { class: clazz, children }: Props = $props();
</script>

<ul class={cn('flex flex-col gap-2', clazz)}>
  {@render children()}
</ul>
