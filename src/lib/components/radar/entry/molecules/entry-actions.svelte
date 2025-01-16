<script lang="ts">
  import type { Entry } from '$lib/radar/core/elements/types.js';

  import MenuActions, {
    type MenuActionHandler,
  } from '$lib/components/menu/molecules/menu-actions.svelte';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Trash from 'lucide-svelte/icons/trash';

  type Actions = {
    onEdit(entry: Entry): void;
    onRemove(entry: Entry): void;
  };

  type Props = {
    entry: Entry;
    actions: Actions;
  };

  const { entry, actions: handlers }: Props = $props();
  // let edit = $state<Entry | null>();
  const actions = [
    {
      icon: Pencil,
      title: 'Edit',
      handle: handlers.onEdit,
    },
    {
      icon: Trash,
      title: 'Remove',
      handle: handlers.onRemove,
    },
  ] satisfies MenuActionHandler<Entry>[];
</script>

<MenuActions {actions} item={entry} />
<!-- 
{#if edit}
  <EntryEdit
    open={!!edit}
    entry={edit}
    onChange={(r) => updateOne({ ...r, id: entry.id })}
  />
{/if} -->
