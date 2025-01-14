<script lang="ts">
  import type { Entry } from '$lib/radar/core/elements/entry.js';
  import type { Ring } from '$lib/radar/core/elements/ring.js';
  import Moved from '../atoms/moved.icon.svelte';
  import New from '../atoms/new.tag.svelte';
  import RingSymbol from '../atoms/ring-symbol.svelte';

  type Props = {
    ring: Ring;
    entry: Entry;
  };

  const { entry, ring }: Props = $props();
</script>

<div
  class="text-xs font-medium flex items-center justify-center gap-2 hover:scale-105"
>
  <RingSymbol color={ring.color} title={ring.name} />

  {entry.name}
  {#if entry.isNew}
    <New />
  {/if}
  {#if entry.moved}
    <Moved variant={entry.moved > 0 ? 'up' : 'down'} />
  {/if}
</div>
