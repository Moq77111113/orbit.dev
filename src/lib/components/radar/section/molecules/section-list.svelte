<script lang="ts">
  import * as List from '$lib/components/ui/list/index.js';
  import type { Section } from '$lib/radar/core/elements/types.js';
  import type { Snippet } from 'svelte';

  type Props = {
    sections: Section[];
    actions?: Snippet<[Section]>;
  };

  const { sections, actions }: Props = $props();
</script>

<List.Root class="gap-2 flex">
  {#each sections as section}
    <List.Item title={section.name}>
      {@render actions?.(section)}
    </List.Item>
  {/each}
</List.Root>
