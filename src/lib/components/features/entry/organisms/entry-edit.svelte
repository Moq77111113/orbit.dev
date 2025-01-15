<script lang="ts">
  import type { Ring, Section } from '$lib/radar/core/elements/types.js';

  import EntryForm from '$lib/components/features/entry/molecules/entry-form.svelte';
  import type { EntrySchema } from '$lib/components/radar/(forms)/entries/schema.js';
  import ResponsiveDialog from '$lib/components/shared/organisms/responsive-dialog.svelte';

  type Props = {
    entry: EntrySchema;
    sections: Section[];
    rings: Ring[];
    open: boolean;
    onSave: (ring: EntrySchema) => void;
  };

  let {
    entry,
    open = $bindable<boolean>(),
    onSave,
    sections,
    rings,
  }: Props = $props();

  const listen = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    }
  ) => {
    if (e.key === 'Escape') {
      open = false;
    }
    if (e.key === 'Enter') {
      onSave({ ...entry });
      open = false;
    }
  };
</script>

<svelte:window on:keydown={listen} />

<ResponsiveDialog bind:open>
  {#snippet title()}
    Edit {entry.name}
  {/snippet}
  {#snippet content()}
    <EntryForm {entry} {sections} {rings} {onSave} />
  {/snippet}
</ResponsiveDialog>
