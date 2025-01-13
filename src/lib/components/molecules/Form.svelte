<script lang="ts" generics="T extends Record<string, unknown>">
  import type { Snippet } from 'svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import type { z } from 'zod';

  type ChildrenProp = {
    values: T;
  };

  type Props = {
    data: T;
    schema: z.Schema<T>;
    onSave: (data: T) => void;
    children: Snippet<[ChildrenProp]>;
  };

  let { data, schema, onSave, children }: Props = $props();

  const form = superForm(data, {
    SPA: true,
    validators: zod(schema),
    resetForm: false,
    onUpdate: ({ form }) => {
      if (form.valid) {
        onSave(form.data);
      }
    },
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="grid gap-4">
  {@render children({ values: $formData })}
</form>
