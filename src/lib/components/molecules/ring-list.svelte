<script lang="ts">
  import * as List from '$lib/components/ui/list/index.js';
  import type { Ring } from '$lib/radar/core/elements/ring.js';
  import type { Snippet } from 'svelte';

  type Props = {
    rings: Ring[];
    actions?: Snippet<[Ring]>;
  };

  const { rings, actions }: Props = $props();
</script>

<List.Root class="gap-2 flex">
  {#each rings as ring}
    <List.Item title={ring.name}>
      {@render actions?.(ring)}
    </List.Item>
  {/each}
</List.Root>
