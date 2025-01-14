<script lang="ts">
  import { cn } from '$lib/utils/ui.js';

  import type { Component } from 'svelte';

  type Props = {
    i: Component;
    class?: string;
  };

  const { i: Icon, class: clazz }: Props = $props();
</script>

<Icon class={cn('size-6', clazz)} />
