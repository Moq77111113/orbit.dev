<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Snippet } from 'svelte';
  import Button from '../ui/button/button.svelte';

  type Props = {
    selected: boolean;
    onclick: () => void;
    children: Snippet;
    class?: string;
  };

  const { selected, onclick, children, class: clazz }: Props = $props();
</script>

<Button
  class={cn('w-full', clazz)}
  variant={selected ? 'default' : 'ghost'}
  {onclick}>{@render children()}</Button
>
