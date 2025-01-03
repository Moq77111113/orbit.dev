<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import Input from '$lib/components/ui/input/input.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import * as Select from '$lib/components/ui/select/index.js';
  import { map } from 'd3';
  import Check from 'lucide-svelte/icons/check';
  import Textarea from '~/lib/components/ui/textarea/textarea.svelte';
  import { entries } from '~/lib/utils/object.js';
  import type { Entry, Ring, Section } from '~/types/radar.js';
  import { useRadar } from '../../context.svelte.js';
  type Props = {
    entry: Entry;
    sections: Section[];
    rings: Ring[];
    open: boolean;
    onChange: (ring: Omit<Entry, 'id'>) => void;
  };

  const radar = useRadar();
  let {
    entry,

    open = $bindable<boolean>(),
    onChange,
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
      onChange({ ...entry });
    }
  };

  type Keys = keyof Entry;
  type BaseField = {
    type: 'input' | 'textarea' | 'select' | 'checkbox';
    label: string;
  };

  type SelectProps = BaseField & {
    type: 'select';
    options: [id: string, label: string][];
  };

  type Options = BaseField | SelectProps;

  type Fields = Record<Keys, Options>;

  const fields = {
    name: { type: 'input', label: 'Name' },
    description: { type: 'textarea', label: 'Description' },
    sectionId: {
      type: 'select',
      label: 'Section',
      options: radar.sections.map((s) => [s.id, s.name]),
    },
    ringId: {
      type: 'select',
      label: 'Ring',
      options: radar.rings.map((r) => [r.id, r.name]),
    },
    isNew: { type: 'checkbox', label: 'Is new' },
    link: { type: 'input', label: 'Link' },
    moved: { type: 'checkbox', label: 'Moved' },
    tags: { type: 'input', label: 'Tags' },
  } as const satisfies Fields;
</script>

<svelte:window on:keydown={listen} />

{#snippet select(
  values: [id: string, label: string][],
  [id, label]: [id: string, label: string],
  onChange: (v: string) => void
)}
  <div class="grid grid-cols-4 items-center gap-4">
    <Label class="text-right">{label}</Label>
    <Select.Root type="single" value={id} onValueChange={onChange}>
      <Select.Trigger>{label}</Select.Trigger>
      <Select.Content>
        {#each values as [valueId, valueLabel] (valueId)}
          <Select.Item value={valueId}>{valueLabel}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
{/snippet}

{#snippet input(label: string, value: string)}
  <div class="grid grid-cols-4 items-center gap-4">
    <Label for={label} class="text-right">{label}</Label>
    <Input id={label} {value} class="col-span-3" />
  </div>
{/snippet}

{#snippet textarea(label: string, value: string)}
  <div class="grid grid-cols-4 items-center gap-4">
    <Label for={label} class="text-right">{label}</Label>
    <Textarea id={label} {value} class="col-span-3" />
  </div>
{/snippet}

{#snippet checkbox(label: string, value: boolean)}
  <div class="grid grid-cols-4 items-center gap-4">
    <Label for={label} class="text-right">{label}</Label>
    <input type="checkbox" id={label} checked={value} class="col-span-1" />
  </div>
{/snippet}

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Title>Edit {entry.name}</Dialog.Title>
    <div class="grid gap-4 py-4">
      {@render input('Name', entry.name)}
      {@render textarea('Description', entry.description ?? '')}
      {@render select(
        radar.sections.map((s) => [s.id, s.name]),
        [
          entry.sectionId,
          radar.sections.find((_) => _.id === entry.sectionId)?.name ?? '',
        ],
        (v) => (entry.sectionId = v)
      )}
      {@render select(
        radar.rings.map((r) => [r.id, r.name]),
        [entry.ringId, fields.ringId.label],
        (v) => (entry.ringId = v)
      )}
      {@render input('Link', entry.link ?? '')}
      {@render input('Tags', (entry.tags ?? []).join(','))}
      {@render checkbox('Is new', entry.isNew === true)}
      {@render checkbox('Moved', entry.moved === 1)}
    </div>

    <Dialog.Footer>
      <Button type="submit" onclick={() => onChange({ ...entry })}
        >Save changes</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
