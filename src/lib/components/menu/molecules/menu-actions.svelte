<script lang="ts" module>
  export type MenuActionHandler<T> = {
    icon: typeof Icon;
    title: string;
    handle(item: T): void;
  };
</script>

<script lang="ts" generics="T">
  import * as List from '$lib/components/ui/list/index.js';
  import type { Icon } from 'lucide-svelte';

  type Props = {
    item: T;
    actions: MenuActionHandler<T>[];
  };

  let { item, actions }: Props = $props();
</script>

<List.Actions>
  {#each actions as action}
    <List.Action
      icon={action.icon}
      onclick={() => action.handle(item)}
      title={action.title}
    />
  {/each}
</List.Actions>
