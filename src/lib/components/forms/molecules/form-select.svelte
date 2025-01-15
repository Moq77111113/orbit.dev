<script lang="ts" module>
  import type { FormPath } from 'sveltekit-superforms';
  type F = Record<string, unknown>;
  type U = FormPath<F>;
</script>

<script
  lang="ts"
  generics="F extends Record<string, unknown>, U extends FormPath<F>"
>
  import * as Form from '$lib/components/ui/form/index.js';
  import type { FsSuperForm } from 'formsnap';

  import LabeledSelect, {
    type SelectProps,
  } from '$lib/components/shared/molecules/labeled-select.svelte';

  type Selection = Pick<SelectProps, 'items' | 'placeholder'>;
  type Props = {
    name: U;
    label: string;
    form: FsSuperForm<F>;
  } & Selection;

  const { name, label, form, ...selectProps }: Props = $props();

  const { form: formData } = form;

</script>

<Form.Field {form} {name}>
  <Form.Control>
    {#snippet children({ props })}
      <LabeledSelect
        {...props}
        {...selectProps}
        {label}
        bind:value={$formData[name] as string}
      />
    {/snippet}
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>
