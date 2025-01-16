<script lang="ts">
  import { type EntrySchema, entryForm } from '$lib/forms/entry.form.js';

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
    entry: EntrySchema;
    onSave: (entry: EntrySchema) => void;
    rings: Ring[];
    sections: Section[];
  };

  const { entry, onSave, rings, sections }: Props = $props();
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
    <div class="grid grid-cols-2 gap-4">
      <FormRadio
        {form}
        name="moved"
        label="Moved"
        items={['-1', '0', '1'] as const}
      >
        {#snippet children(value)}
          <Moved variant={value} color={'black'} class="size-4" />
        {/snippet}
      </FormRadio>

      <FormCheckbox
        {form}
        name="isNew"
        label="New"
        type="checkbox"
        class="ml-2"
      />
    </div>
    <Button type="submit">Save</Button>
  {/snippet}
</FormWrapper>
