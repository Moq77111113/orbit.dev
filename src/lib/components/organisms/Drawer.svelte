<script lang="ts">
  import * as Drawer from '$lib/components/ui/drawer/index.js';
  import type { Snippet } from 'svelte';
  type Props = {
    open: boolean;
    title: Snippet;
    content: Snippet;
    footer?: Snippet;
  };

  let { open = $bindable<boolean>(), title, content, footer }: Props = $props();
</script>

<Drawer.Root bind:open>
  <Drawer.Content class="px-2">
    <Drawer.Header>
      <Drawer.Title>{@render title()}</Drawer.Title>
    </Drawer.Header>
    {@render content()}
    {#if footer}
      <Drawer.Footer>
        {@render footer()}
      </Drawer.Footer>
    {/if}
  </Drawer.Content>
</Drawer.Root>
