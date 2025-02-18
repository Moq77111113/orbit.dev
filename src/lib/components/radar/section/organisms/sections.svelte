<script lang="ts">
  import SectionCreate from '$lib/components/radar/section/molecules/section-create.svelte';
  import type { Section } from '$lib/radar/core/elements/types.js';

  import {
    addSection,
    removeSection,
    renameSection,
  } from '$lib/radar/features/actions/index.js';

  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';
  import SectionActions from '../molecules/section-actions.svelte';
  import SectionList from '../molecules/section-list.svelte';
  import SectionEdit from './section-edit.svelte';

  const orbit = useOrbit();

  let selected = $state<Section | null>(null);
  let open = $state(false);
  const add = (name: string) => {
    orbit.execute(addSection, { name });
  };

  const edit = (section: Section) => {
    selected = section;
    open = true;
  };

  const remove = (section: Section) => {
    orbit.execute(removeSection, section.id);
  };

  const update = (
    section: Partial<Omit<Section, 'id'>> & Pick<Section, 'id'>
  ) => {
    section.name &&
    orbit.execute(renameSection, { id: section.id, name: section.name });
    selected = null;
  };
</script>

<div class="flex flex-col py-4">
  <SectionList sections={orbit.state.radar.sections}>
    {#snippet actions(section)}
      <SectionActions
        {section}
        actions={{
          onEdit: edit,
          onRemove: remove,
        }}
      />
    {/snippet}
  </SectionList>
  <SectionCreate oncreate={add} />
</div>

{#if selected}
  <SectionEdit
    bind:open
    section={selected}
    onChange={(s) => update({ ...s, id: selected!.id })}
  />
{/if}
