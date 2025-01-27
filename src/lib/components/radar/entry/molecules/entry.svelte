<script lang="ts">
  import type { Entry } from '$lib/radar/core/elements/types.js';

  import type { EnrichedEntry } from '$lib/radar/features/layers/base/types.js';
  import Moved from '../atoms/moved-icon.svelte';
  import New from '../atoms/new.svelte';
  import RingSymbol from '../atoms/ring-symbol.svelte';

  type Props = {
    entry: EnrichedEntry;
  };

  const { entry }: Props = $props();

  const asString = (moved: Entry['moved']) => {
    if (!moved) return '0';

    if (moved > 0) return '1';
    return '-1';
  };
</script>

<div
  class="text-xs font-medium flex items-center justify-center gap-2 hover:scale-105"
>
  <RingSymbol color={entry.ring.color} title={entry.ring.name} />

  {entry.name}
  {#if entry.isNew}
    <New />
  {/if}
  {#if entry.moved}
    <Moved variant={asString(entry.moved)} />
  {/if}
</div>
