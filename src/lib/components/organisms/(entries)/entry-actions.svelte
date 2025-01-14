<script lang="ts">
  import Actions from '$lib/components/molecules/menu-actions.svelte';
  import type { ActionHandle } from '$lib/components/molecules/menu-actions.svelte';
  import type { Entry } from '$lib/radar/core/elements/entry.js';

  import { removeEntry } from '$lib/radar/features/actions/index.js';

  import { useRadar } from '$lib/radar/state/state.svelte.js';

  import Pencil from 'lucide-svelte/icons/pencil';

  import Trash from 'lucide-svelte/icons/trash';

  const radar = useRadar();
  type Props = {
    entry: Entry;
  };

  const { entry }: Props = $props();
  let edit = $state<Entry | null>();
  const actions = [
    {
      icon: Pencil,
      title: 'Edit',
      handle: (entry: Entry) => {
        edit = entry;
      },
    },
    {
      icon: Trash,
      title: 'Remove',
      handle: (entry: Entry) => {
        radar.execute(removeEntry, entry.id);
      },
    },
  ] satisfies ActionHandle<Entry>[];

 
</script>

<Actions {actions} item={entry} />

{#if edit}
  <EntryEdit
    open={!!edit}
    entry={edit}
    onChange={(r) => updateOne({ ...r, id: entry.id })}
  />
{/if}
