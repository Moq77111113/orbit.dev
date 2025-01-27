<script lang="ts" module>
  import type { Entry, Ring, Section } from '$lib/radar/core/elements/types.js';

  type MaybeEntry = Omit<Entry, 'id'> & { id?: Entry['id'] };

  function isUpdatable(entry: MaybeEntry): entry is Entry {
    return 'id' in entry;
  }
</script>

<script lang="ts">
  import MenuSection from '$lib/components/menu/molecules/menu-section.svelte';
  import { asTree, flatten } from '$lib/radar/core/elements/tree.js';
  import {
    addEntry,
    removeEntry,
    updateEntry,
  } from '$lib/radar/features/actions/index.js';
  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';
  import EntryActions from '../molecules/entry-actions.svelte';
  import EntryList from '../molecules/entry-list.svelte';

  import EntryEdit from './entry-edit.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';

  import EntryCreate from '../molecules/entry-create.svelte';

  const orbit = useOrbit();
  const sections = $derived(asTree(orbit.state.radar));
  let open = $state(false);
  let selected = $state<MaybeEntry | null>(null);

  const edit = (entry: Entry) => {
    selected = entry;
    open = true;
  };

  const add = (section?: Section['id'], ring?: Ring['id']) => {
    section = section ?? orbit.state.radar.sections[0].id;
    ring = ring ?? orbit.state.radar.rings[0].id;
    selected = {
      name: '',
      sectionId: section,
      ringId: ring,
      isNew: true,
    };
    open = true;
  };

  const remove = (entry: Entry) => {
    orbit.execute(removeEntry, entry.id);
  };

  const addOrUpdate = (entry: MaybeEntry) => {
    if (isUpdatable(entry)) {
      orbit.execute(updateEntry, entry);
    } else {
      orbit.execute(addEntry, entry);
    }
    selected = null;
    open = false;
  };
</script>

<section class="space-y-2">
  {#if !sections.length}
    <p class="py-6 text-center text-gray-500">
      Start by adding Sections and Rings !
    </p>
  {/if}
  {#each sections as section, i (section.id)}
    <MenuSection title={section.name}>
      <div class="flex flex-col py-4">
        <EntryList entries={flatten(section)}>
          {#snippet actions(entry)}
            <EntryActions
              {entry}
              actions={{
                onEdit: edit,
                onRemove: remove,
              }}
            />
          {/snippet}
        </EntryList>
        <EntryCreate oncreate={() => add(section.id)} />
      </div>
    </MenuSection>
    {#if i < sections.length - 1}
      <Separator />
    {/if}
  {/each}
</section>

{#if !!selected}
  <EntryEdit
    bind:open
    entry={selected}
    sections={orbit.state.radar.sections}
    rings={orbit.state.radar.rings}
    onSave={addOrUpdate}
  />
{/if}
