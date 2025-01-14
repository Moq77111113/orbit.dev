<script lang="ts">
  import { type RingSchema, ringForm } from '$lib/forms/ring.form.js';
  import FormField from '../../molecules/form-input.svelte';
  import FormWrapper from '../../molecules/form-wrapper.svelte';
  import Button from '../../ui/button/button.svelte';

  type Props = {
    ring: RingSchema;
    onSave: (ring: RingSchema) => void;
  };

  const { ring, onSave }: Props = $props();
</script>

<FormWrapper data={ring} {onSave} schema={ringForm}>
  {#snippet children(form)}
    <FormField {form} name="name" label="Name" />
    <FormField {form} name="color" label="Color" type="color"></FormField>

    <Button type="submit">Save</Button>
  {/snippet}
</FormWrapper>
