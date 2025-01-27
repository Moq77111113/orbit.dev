<script lang="ts">
  import {
    type EntryForm,
    entryForm,
  } from '$lib/validators/entry.validator.js';

  import FormCheckbox from '$lib/components/forms/molecules/form-checkbox.svelte';
  import Moved from '$lib/components/radar/entry/atoms/moved-icon.svelte';

  import FormInput from '$lib/components/forms/molecules/form-input.svelte';
  import FormRadio from '$lib/components/forms/molecules/form-radio.svelte';
  import FormSelect from '$lib/components/forms/molecules/form-select.svelte';
  import FormTextarea from '$lib/components/forms/molecules/form-textarea.svelte';
  import FormWrapper from '$lib/components/forms/molecules/form-wrapper.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  import type { Ring } from '$lib/radar/core/elements/types.js';
  import type { Section } from '$lib/radar/core/elements/types.js';

  type Props = {
    entry: EntryForm;
    onSave: (entry: EntryForm) => void;
    rings: Ring[];
    sections: Section[];
    submit?: HTMLButtonElement;
  };

  let {
    entry,
    onSave,
    rings,
    sections,
    submit = $bindable(),
  }: Props = $props();
</script>

<FormWrapper data={entry} {onSave} schema={entryForm}>
  {#snippet children(form)}
    <FormInput {form} name="name" label="Name" />
    <FormTextarea {form} name="description" label="Description" />
    <FormSelect
      {form}
      placeholder="Select a section"
      name="sectionId"
      label="Section"
      items={sections}
    />
    <FormSelect
      {form}
      placeholder="Select a ring"
      name="ringId"
      label="Ring"
      items={rings}
    />
    <FormInput {form} name="link" label="Link" />
    <div class="grid grid-cols-2 place-items-center gap-4">
      <FormRadio
        {form}
        name="moved"
        label="Moved"
        items={['-1', '0', '1'] as const}
        parse={(value) => parseInt(value) as -1 | 0 | 1}
        revParse={(value) => (value ?? 0).toString()}
      >
        {#snippet children(value)}
          <Moved variant={value} class="size-4" />
        {/snippet}
      </FormRadio>

      <FormCheckbox {form} name="isNew" label="New" type="checkbox" />
    </div>

    <Button type="submit" class="mt-4" bind:ref={submit}>Save</Button>
  {/snippet}
</FormWrapper>
