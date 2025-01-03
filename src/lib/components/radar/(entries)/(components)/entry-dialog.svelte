<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Dialog from '$lib/components/ui/dialog/index.js';

  import type { Entry, Ring, Section } from '~/types/radar.js';
  import EntryForm from '../../(forms)/entries/EntryForm.svelte';
  import { useRadar } from '../../context.svelte.js';
  type Props = {
    entry: Entry;
    sections: Section[];
    rings: Ring[];
    open: boolean;
    onChange: (ring: Omit<Entry, 'id'>) => void;
  };

  const radar = useRadar();
  let { entry, open = $bindable<boolean>(), onChange }: Props = $props();

  const listen = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    }
  ) => {
    if (e.key === 'Escape') {
      open = false;
    }
    if (e.key === 'Enter') {
      onChange({ ...entry });
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
      sections={radar.sections}
      rings={radar.rings}
      onSave={(e) => {
        onChange({ ...e });
        open = false;
      }}
    />
  </Dialog.Content>
</Dialog.Root>
