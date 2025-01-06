<script lang="ts">
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Plus from 'lucide-svelte/icons/plus';

  import Trash from 'lucide-svelte/icons/trash';
  import { entries } from '~/lib/utils/object.js';
  import { cn } from '~/lib/utils/ui.js';
  import type { Entry, Ring, Section } from '~/types/radar.js';

  import { Button } from '../ui/button/index.js';
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
    if (!selectedEntry) {
      edit = false;
      return;
    }
    edit = !edit;
  };

  const defineNewEntry = (
    section: Section['id'] = radar.sections?.[0]?.id,
    ring: Ring['id'] = radar.rings?.[0]?.id
  ) => {
    selectedEntry = {
      id: `ent-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      sectionId: section,
      ringId: ring,
      isNew: true,
    };
    edit = true;
  };
</script>

<section class="space-y-2">
  {#each entries(radar.entriesPerSection) as [section, radarEntries]}
    <SidebarElement title={section}>
      <List.Root>
        {#each radarEntries.sort( (a, b) => sortPerRingIndex(a.ring, b.ring) ) as { entry, ring }}
          <List.Item>
            {#snippet title()}
              <div
                class=" text-xs font-medium flex items-center justify-center gap-2 hover:scale-105"
              >
                <span
                  style="--rng-color: {ring.color}"
                  title={ring.name}
                  class="size-1 rounded-full ring-2 ring-[--rng-color]"
                >
                </span>
                {entry.name}
                {#if entry.isNew}
                  <span
                    class="rounded-md bg-[#afa] p-1 text-xs leading-none text-black no-underline"
                  >
                    new
                  </span>
                {/if}
                {#if entry.moved}
                  <ArrowDown
                    class={cn(
                      { 'rotate-180 text-green-600': entry.moved === 1 },
                      { 'text-red-600': entry.moved === -1 },
                      'size-3 '
                    )}
                  />
                {/if}
              </div>
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
      <Button
        size="icon"
        variant="ghost"
        class="hover:bg-inherit hover:scale-110"
        onclick={() => defineNewEntry(radarEntries[0]?.section.id)}
        ><Plus class="size-4" /></Button
      >
      <Separator />
    </SidebarElement>
  {/each}
</section>

{#if selectedEntry}
  <EntryDialog
    entry={selectedEntry}
    sections={radar.sections}
    rings={radar.rings}
    bind:open={edit}
    onSave={(e) => radar.addOrUpdateEntry({ ...e, id: selectedEntry!.id })}
  />
{/if}
