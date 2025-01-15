<script lang="ts" generics="T extends Record<string, unknown>">
  import type { FsSuperForm } from 'formsnap';
  import type { Snippet } from 'svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import type { z } from 'zod';

  type ChildrenProp = FsSuperForm<T>;

  type Props = {
    data: T;
    schema: z.Schema<T>;
    onSave: (data: T) => void;
    children: Snippet<[ChildrenProp]>;
  };

  let { data, schema, onSave, children }: Props = $props();

  const form = superForm(data, {
    SPA: true,
    dataType: 'json',
    validators: zod(schema),
    resetForm: false,
    onUpdate: ({ form }) => {
      if (form.valid) {
        onSave(form.data);
      }
    },
  });

  const { enhance } = form;
</script>

<form method="POST" use:enhance class="grid gap-4">
  {@render children(form)}
</form>
