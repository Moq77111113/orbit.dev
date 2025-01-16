<script lang="ts">
  import * as Toolbar from '$lib/components/ui/toolbar/index.js';
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    class?: string;
  };

  const { children, class: clazz }: Props = $props();
  let open = $state(false);
</script>

<Toolbar.Root
  class={clazz}
  bind:islandOpen={open}
  style="--toolbar-padding: 4rem"
>
  {@render children()}
</Toolbar.Root>
