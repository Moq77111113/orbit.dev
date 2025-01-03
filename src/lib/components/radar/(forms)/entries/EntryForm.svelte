<script lang="ts">
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import ArrowUp from 'lucide-svelte/icons/arrow-up';
  import Minus from 'lucide-svelte/icons/minus';

  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import Button from '~/lib/components/ui/button/button.svelte';
  import type { Entry, Ring, Section } from '~/types/radar.js';
  import { entrySchema } from './schema.js';

  type Props = {
    entry: Entry;
    sections: Section[];
    rings: Ring[];

    onSave: (entry: Entry) => void;
  };

  const { entry, sections, rings, onSave }: Props = $props();

  const form = superForm(entry, {
    SPA: true,
    validators: zod(entrySchema),
    resetForm: false,
    onUpdate: ({ form }) => {
      console.log(form.data);
      if (form.valid) {
        onSave(form.data);
      }
    },
  });

  const { form: formData, enhance } = form;

  const ring = $derived(rings.find((_) => _.id === $formData.ringId));
  const section = $derived(sections.find((_) => _.id === $formData.sectionId));

  const icon = (moved: Entry['moved'] = 0) => {
    if (moved === -1) return ArrowDown;

    if (moved === 1) return ArrowUp;
    return Minus;
  };
</script>

<form method="POST" use:enhance class="grid gap-4">
  <Form.Field {form} name="name" class="mb-2">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Name</Form.Label>
        <Input {...props} bind:value={$formData.name} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="description" class="mb-2">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Description</Form.Label>
        <Textarea {...props} bind:value={$formData.description} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="sectionId" class="mb-2">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Section</Form.Label>
        <Select.Root
          type="single"
          bind:value={$formData.sectionId}
          name={props.name}
        >
          <Select.Trigger {...props}
            >{section?.name ?? 'Select a section'}</Select.Trigger
          >
          <Select.Content>
            {#each sections as section (section.id)}
              <Select.Item value={section.id}>{section.name}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="ringId" class="mb-2">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Ring</Form.Label>
        <Select.Root
          type="single"
          bind:value={$formData.ringId}
          name={props.name}
        >
          <Select.Trigger {...props}
            >{ring?.name ?? 'Select a ring'}</Select.Trigger
          >
          <Select.Content>
            {#each rings as ring (ring.id)}
              <Select.Item value={ring.id}>{ring.name}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="link" class="mb-2">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Link</Form.Label>
        <Input {...props} bind:value={$formData.link} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <div class="grid grid-cols-2 gap-4">
    <Form.Fieldset {form} name="moved" class="mb-2">
      <Form.Legend>Moved</Form.Legend>
      <RadioGroup.Root
        value={$formData.moved?.toString() ?? '0'}
        onValueChange={(v) => ($formData.moved = parseInt(v) as Entry['moved'])}
        class="flex space-x-2"
        name="moved"
      >
        {#each [-1, 0, 1] as const as value}
          <div class="flex items-center space-x-2">
            <Form.Control>
              {#snippet children({ props })}
                <RadioGroup.Item value={value.toString()} {...props} />
                <Form.Label class="font-normal">
                  {@const Icon = icon(value)}
                  <Icon size="16" />
                </Form.Label>
              {/snippet}
            </Form.Control>
          </div>
        {/each}
      </RadioGroup.Root>
    </Form.Fieldset>

    <Form.Field {form} name="isNew" class="">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Is new</Form.Label>
          <Checkbox {...props} bind:checked={$formData.isNew} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>
  <Button type="submit" class="place-self-end">Save changes</Button>
</form>
