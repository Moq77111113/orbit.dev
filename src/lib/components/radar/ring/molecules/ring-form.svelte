<script lang="ts">
  import FormInput from '$lib/components/forms/molecules/form-input.svelte';
  import FormWrapper from '$lib/components/forms/molecules/form-wrapper.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { type RingForm, ringForm } from '$lib/validators/ring.validator.js';

  type Props = {
    ring: RingForm;
    onSave: (ring: RingForm) => void;
  };

  const { ring, onSave }: Props = $props();
</script>

<FormWrapper data={ring} {onSave} schema={ringForm}>
  {#snippet children(form)}
    <FormInput {form} name="name" label="Name" />
    <FormInput {form} name="color" label="Color" type="color" />

    <Button type="submit">Save</Button>
  {/snippet}
</FormWrapper>
