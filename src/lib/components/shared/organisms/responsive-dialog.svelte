<script lang="ts">
  import type { Snippet } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import Dialog from '../molecules/dialog.svelte';
  import Drawer from '../molecules/drawer.svelte';
  type Props = {
    open: boolean;
    title: Snippet;
    content: Snippet;
    footer?: Snippet;
  };

  const isDesktop = new MediaQuery('(min-width: 768px)');

  let { open = $bindable(), ...rest }: Props = $props();
</script>

{#if isDesktop.current}
  <Dialog bind:open {...rest} />
{:else}
  <Drawer bind:open {...rest} />
{/if}
