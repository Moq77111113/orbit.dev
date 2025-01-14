<script lang="ts" module>
  import type { FormPath } from 'sveltekit-superforms';
  type F = Record<string, unknown>;
  type U = FormPath<F>;

  type T = { id: string; name: string };
</script>

<script
  lang="ts"
  generics="F extends Record<string, unknown>, U extends FormPath<F>, T extends string"
>
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import type { FsSuperForm } from 'formsnap';
  import type { Snippet } from 'svelte';

  type RadioProps = {
    items: T[];
  };
  type Props = {
    name: U;
    label: string;
    form: FsSuperForm<F>;
    class?: string;
    children?: Snippet<[T]>;
  } & RadioProps;

  const {
    name,
    label,
    form,
    class: clazz,
    items,
    children: childrenProp,
  }: Props = $props();

  const { form: formData } = form;
</script>

<Form.Fieldset {form} {name} class={clazz}>
  <Form.Legend>{label}</Form.Legend>
  <RadioGroup.Root
    value={$formData[name] as string}
    onValueChange={(v) => ($formData[name] = v as unknown as F[U])}
    class="flex space-x-2"
    {name}
  >
    {#each items as value}
      <div class="flex items-center space-x-2">
        <Form.Control>
          {#snippet children({ props })}
            <RadioGroup.Item {value} {...props} />
            <Form.Label class="font-normal">
              {#if childrenProp}
                {@render childrenProp(value)}
              {:else}
                {value}
              {/if}
            </Form.Label>
          {/snippet}
        </Form.Control>
      </div>
    {/each}
  </RadioGroup.Root>
</Form.Fieldset>
