<script lang="ts">
  import FormInput from '$lib/components/forms/molecules/form-input.svelte';
  import FormWrapper from '$lib/components/forms/molecules/form-wrapper.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  import { type SectionSchema, sectionForm } from '$lib/forms/section.form.js';

  type Props = {
    section: SectionSchema;
    onSave: (section: SectionSchema) => void;
  };

  const { section, onSave }: Props = $props();
</script>

<FormWrapper data={section} {onSave} schema={sectionForm}>
  {#snippet children(form)}
    <FormInput {form} name="name" label="Name" />
    <Button type="submit">Save</Button>
  {/snippet}
</FormWrapper>
