<script lang="ts">
  import type { Ring, Section } from '$lib/radar/core/elements/types.js';

  import EntryForm from '$lib/components/radar/entry/molecules/entry-form.svelte';
  import ResponsiveDialog from '$lib/components/shared/organisms/responsive-dialog.svelte';
  import type { EntryForm as EntryFormSchema } from '$lib/validators/entry.validator.js';

  type Props = {
    entry: EntryFormSchema;
    sections: Section[];
    rings: Ring[];
    open: boolean;
    onSave: (ring: EntryFormSchema) => void;
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
