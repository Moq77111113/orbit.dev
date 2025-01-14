<script lang="ts">
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Plus from 'lucide-svelte/icons/plus';

  import { entries } from '$lib/utils/object.js';
  import { cn } from '$lib/utils/ui.js';
  import Trash from 'lucide-svelte/icons/trash';

  import type { Entry } from '$lib/radar/core/elements/entry.js';
  import type { Ring } from '$lib/radar/core/elements/ring.js';
  import type { Section } from '$lib/radar/core/elements/section.js';
  import { addEntry, updateEntry } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';

  import EntrySectionTitle from '../molecules/entry-section-title.svelte';
  import SidebarElement from '../molecules/menu-section.svelte';
  import { Button } from '../ui/button/index.js';
  import * as List from '../ui/list/index.js';
  import Separator from '../ui/separator/separator.svelte';
  import EntryDialog from './(entries)/(components)/entry-dialog.svelte';
  import type { EntrySchema } from './(forms)/entries/schema.js';

  const radar = useRadar();
  type Enriched = { entry: Entry; ring: Ring; section: Section };

  const entriesPerSection = $derived.by(() => {
    const sectionCache = new Map<string, Section>();
    const ringCache = new Map<string, Ring>();
    return radar.state.radar.entries.reduce<
      Record<Section['name'], Enriched[]>
    >((acc, entry) => {
      const section =
        sectionCache.get(entry.sectionId) ??
        radar.state.radar.sections.find((s) => s.id === entry.sectionId);
      const ring =
        ringCache.get(entry.ringId) ??
        radar.state.radar.rings.find((r) => r.id === entry.ringId);

      if (!section || !ring) {
        return acc;
      }
      if (!acc[section.name]) {
        acc[section.name] = [];
      }

      acc[section.name].push({ entry, section, ring });

      return acc;
    }, {});
  });

  function sortPerRingIndex(a: Ring, b: Ring) {
    const aIdx = radar.state.radar.rings.findIndex((ring) => ring.id === a.id);
    const bIdx = radar.state.radar.rings.findIndex((ring) => ring.id === b.id);
    return aIdx - bIdx;
  }

  function sortPerSectionName(a: Section['name'], b: Section['name']) {
    const aIdx = radar.state.radar.sections.findIndex(
      (section) => section.name === a
    );
    const bIdx = radar.state.radar.sections.findIndex(
      (section) => section.name === b
    );
    return aIdx - bIdx;
  }

  let selectedEntry = $state<EntrySchema | null>(null);
  let edit = $state(false);

  const toggleEdit = (entry?: Entry) => {
    selectedEntry = entry || null;
    if (!selectedEntry) {
      edit = false;
      return;
    }
    edit = !edit;
  };

  const editNewEntry = (
    section: Section['id'] = radar.state.radar.sections?.[0]?.id,
    ring: Ring['id'] = radar.state.radar.rings?.[0]?.id
  ) => {
    selectedEntry = {
      name: '',
      sectionId: section,
      ringId: ring,
      isNew: true,
    };
    edit = true;
  };

  function isUpdatable(
    entry: EntrySchema
  ): entry is EntrySchema & { id: Entry['id'] } {
    return 'id' in entry;
  }

  function addOrUpdate(entry: EntrySchema) {
    if (isUpdatable(entry)) {
      radar.execute(updateEntry, entry);
    } else {
      radar.execute(addEntry, entry);
    }
  }
</script>

<section class="space-y-2">
  {#each entries(entriesPerSection).sort( ([a], [b]) => sortPerSectionName(a, b) ) as [section, radarEntries]}
    <SidebarElement title={section}>
      <List.Root>
        {#each radarEntries.sort( (a, b) => sortPerRingIndex(a.ring, b.ring) ) as { entry, ring }}
          <List.Item>
            {#snippet title()}
              <EntrySectionTitle {ring} {entry} />
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
        onclick={() => editNewEntry(radarEntries[0]?.section.id)}
        ><Plus class="size-4" /></Button
      >
      <Separator />
    </SidebarElement>
  {/each}
</section>

{#if selectedEntry}
  <EntryDialog
    entry={selectedEntry}
    sections={radar.state.radar.sections}
    rings={radar.state.radar.rings}
    bind:open={edit}
    onSave={(e) => addOrUpdate(e)}
  />
{/if}
