<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';

  import type { Ring, Section } from '$lib/radar/core/elements/types.js';

  import EntryForm from '$lib/components/radar/(forms)/entries/EntryForm.svelte';
  import type { EntrySchema } from '$lib/components/radar/(forms)/entries/schema.js';

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

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Title>Edit {entry.name}</Dialog.Title>
    <EntryForm
      {entry}
      {sections}
      {rings}
      onSave={(e) => {
        onSave(e);
        open = false;
      }}
    />
  </Dialog.Content>
</Dialog.Root>
