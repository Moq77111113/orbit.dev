<script lang="ts">
  import Pencil from 'lucide-svelte/icons/pencil';
  import Trash from 'lucide-svelte/icons/trash';
  import { entries } from '~/lib/utils/object.js';
  import type { Entry, Ring } from '~/types/radar.js';
  import * as List from '../ui/list/index.js';
  import Separator from '../ui/separator/separator.svelte';
  import EntryDialog from './(entries)/(components)/entry-dialog.svelte';
  import SidebarElement from './SidebarElement.svelte';
  import { useRadar } from './context.svelte.js';

  const radar = useRadar();

  function sortPerRingIndex(a: Ring, b: Ring) {
    const aIdx = radar.rings.findIndex((ring) => ring.id === a.id);
    const bIdx = radar.rings.findIndex((ring) => ring.id === b.id);
    return aIdx - bIdx;
  }

  let selectedEntry = $state<Entry | null>(null);
  let edit = $state(false);

  const toggleEdit = (entry?: Entry) => {
    selectedEntry = entry || null;
    edit = !edit;
  };

  $effect(() => {
    if (edit === false) {
      selectedEntry = null;
    }
  });
</script>

{#each entries(radar.entriesPerSection) as [section, radarEntries]}
  <SidebarElement title={section}>
    <List.Root>
      {#each radarEntries.sort( (a, b) => sortPerRingIndex(a.ring, b.ring) ) as { entry, ring }}
        <List.Item>
          {#snippet title()}
            <span class="text-xs font-medium flex items-center gap-2"
              ><div
                title={ring.name}
                class="size-2 rounded-full"
                style="background-color: {ring.color}"
              ></div>
              {entry.name}
            </span>
          {/snippet}

          <List.Actions>
            <List.Action
              title={'Edit'}
              icon={Pencil}
              onclick={() => toggleEdit(entry)}
            />
            <List.Action title={'Delete'} icon={Trash} />
          </List.Actions>
        </List.Item>
      {/each}
    </List.Root>
    <Separator />
  </SidebarElement>
{/each}

{#if selectedEntry}
  <EntryDialog
    entry={selectedEntry}
    sections={radar.sections}
    rings={radar.rings}
    bind:open={edit}
    onChange={(e) => radar.updateEntry({ ...e, id: selectedEntry!.id })}
  />
{/if}
