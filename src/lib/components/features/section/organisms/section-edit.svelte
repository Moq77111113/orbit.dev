<script lang="ts">
  import ResponsiveDialog from '$lib/components/shared/organisms/responsive-dialog.svelte';
  import type { Section } from '$lib/radar/core/elements/types.js';

  import SectionForm from '../molecules/section-form.svelte';

  type Props = {
    section: Section;
    open: boolean;
    onChange: (section: Omit<Section, 'id'>) => void;
  };

  let { section, open = $bindable<boolean>(), onChange }: Props = $props();

  const listen = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    }
  ) => {
    if (e.key === 'Escape') {
      open = false;
    }
    if (e.key === 'Enter') {
      onChange({ ...section });
    }
  };
</script>

<svelte:window on:keydown={listen} />

<ResponsiveDialog bind:open>
  {#snippet title()}
    Edit {section.name}
  {/snippet}
  {#snippet content()}
    <SectionForm {section} onSave={onChange} />
  {/snippet}
</ResponsiveDialog>
