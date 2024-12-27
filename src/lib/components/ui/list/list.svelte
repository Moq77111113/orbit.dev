<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import { cn } from '~/lib/utils/ui.js';
  import ListItem from './list-item.svelte';

  type ItemActions = Snippet<[{ item: T }]>;
  type Props = {
    items: T[];
    text: (item: T) => string;
    class?: string;
    children?: ItemActions;
  };

  let { items, class: clazz, children, text }: Props = $props();
</script>

<ul class={cn('flex flex-col gap-2', clazz)}>
  {#each items as item}
    <ListItem title={text(item)}>
      {@render children?.({ item })}
    </ListItem>
  {/each}
</ul>
