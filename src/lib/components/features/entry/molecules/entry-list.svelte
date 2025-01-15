<script lang="ts">
  import * as List from '$lib/components/ui/list/index.js';

  import type { EnrichedEntry } from '$lib/radar/features/layers/base/types.js';
  import type { Snippet } from 'svelte';
  import Entry from './entry.svelte';
  type Props = {
    entries: EnrichedEntry[];
    actions?: Snippet<[EnrichedEntry]>;
  };

  const { entries, actions }: Props = $props();
</script>

<List.Root class="gap-2 flex">
  {#each entries as entry (entry.id)}
    <List.Item>
      {#snippet title()}
        <Entry {entry} />
      {/snippet}
      {@render actions?.(entry)}
    </List.Item>
  {/each}
</List.Root>
