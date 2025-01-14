<script lang="ts">
  import { type SectionSchema, sectionForm } from '$lib/forms/section.form.js';
  import FormField from '../../molecules/form-input.svelte';
  import FormWrapper from '../../molecules/form-wrapper.svelte';
  import Button from '../../ui/button/button.svelte';

  type Props = {
    section: SectionSchema;
    onSave: (section: SectionSchema) => void;
  };

  const { section, onSave }: Props = $props();
</script>

<FormWrapper data={section} {onSave} schema={sectionForm}>
  {#snippet children(form)}
    <FormField {form} name="name" label="Name" />
    <Button type="submit">Save</Button>
  {/snippet}
</FormWrapper>
