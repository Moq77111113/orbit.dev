<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as List from '$lib/components/ui/list/index.js';
  import { cn } from '$lib/utils/ui.js';
  import type { MenuActionHandler } from '../../molecules/menu-actions.svelte';
  

  type Props = {
    actions: MenuActionHandler<void>[];
  };

  const { actions }: Props = $props();
</script>

<List.Root class="gap-2 flex ">
  {#each actions as action}
    <Button
      variant="ghost"
      onclick={() => action.handle()}
      class={cn('flex justify-between', action.class)}
      ><List.Item title={action.title} />{@const Icon = action.icon}<Icon
      /></Button
    >
  {/each}
</List.Root>
