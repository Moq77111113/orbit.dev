<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import type { Snippet } from 'svelte';

  type Props = {
    open: boolean;
    title: Snippet;
    content: Snippet;
    footer: Snippet;
  };

  let { open = $bindable<boolean>(), title, content, footer }: Props = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="px-2">
    <Dialog.Title>{@render title()}</Dialog.Title>
    {@render content()}

    <Dialog.Footer>
      {@render footer()}
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
