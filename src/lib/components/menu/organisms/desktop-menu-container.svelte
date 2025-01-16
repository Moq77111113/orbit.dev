<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';

  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    class?: string;
  };

  const { children, class: clazz }: Props = $props();
</script>

<Sidebar.Provider class={clazz}>
  {@render children()}
</Sidebar.Provider>
