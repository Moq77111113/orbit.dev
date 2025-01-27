<script lang="ts">
  import FormInput from '$lib/components/forms/molecules/form-input.svelte';
  import FormWrapper from '$lib/components/forms/molecules/form-wrapper.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  import {
    type SectionForm,
    sectionForm,
  } from '$lib/validators/section.validator.js';

  type Props = {
    section: SectionForm;
    onSave: (section: SectionForm) => void;
    submit?: HTMLButtonElement;
  };

  let { section, onSave, submit = $bindable() }: Props = $props();
</script>

<FormWrapper data={section} {onSave} schema={sectionForm}>
  {#snippet children(form)}
    <FormInput {form} name="name" label="Name" />
    <Button type="submit" bind:ref={submit}>Save</Button>
  {/snippet}
</FormWrapper>
