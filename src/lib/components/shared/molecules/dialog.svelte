<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import type { Snippet } from 'svelte';

  type Props = {
    open: boolean;
    title: Snippet;
    content: Snippet;
    footer?: Snippet;
  };

  let { open = $bindable<boolean>(), title, content, footer }: Props = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="p-4">
    <Dialog.Title>{@render title()}</Dialog.Title>
    {@render content()}

    {#if footer}
      <Dialog.Footer>
        {@render footer()}
      </Dialog.Footer>
    {/if}
  </Dialog.Content>
</Dialog.Root>
