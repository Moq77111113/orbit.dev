<script lang="ts">
  import Actions from '$lib/components/molecules/Actions.svelte';
  import type { ActionHandle } from '$lib/components/molecules/Actions.svelte';

  import type { Section } from '$lib/radar/core/elements/section.js';
  import {
    removeSection,
    renameSection,
  } from '$lib/radar/features/actions/index.js';

  import { useRadar } from '$lib/radar/state/state.svelte.js';

  import Pencil from 'lucide-svelte/icons/pencil';

  import Trash from 'lucide-svelte/icons/trash';
  import SectionEdit from './SectionEdit.svelte';

  const radar = useRadar();
  type Props = {
    section: Section;
  };

  const { section }: Props = $props();
  let edit = $state<Section | null>();
  const actions = [
    {
      icon: Pencil,
      title: 'Edit',
      handle: (section: Section) => {
        edit = section;
      },
    },
    {
      icon: Trash,
      title: 'Remove',
      handle: (section: Section) => {
        radar.execute(removeSection, section.id);
      },
    },
  ] satisfies ActionHandle<Section>[];

  const updateOne = (
    section: Partial<Omit<Section, 'id'>> & Pick<Section, 'id'>
  ) => {
    section.name &&
      radar.execute(renameSection, { id: section.id, name: section.name });
    edit = null;
  };
</script>

<Actions {actions} item={section} />

{#if edit}
  <SectionEdit
    open={!!edit}
    section={edit}
    onChange={(r) => updateOne({ ...r, id: section.id })}
  />
{/if}
