<script lang="ts">
  import type { Snippet } from 'svelte';

  import { cn } from '$lib/utils/ui.js';
  import { Label } from '../ui/label/index.js';

  export type InputFieldProps = {
    label: string;
    id?: string;
    children?: Snippet;
    class?: string;
  };

  let { label, id, children, class: clazz }: InputFieldProps = $props();
</script>

<Label for={id} class={cn('capitalize', clazz)}>{label}</Label>
{@render children?.()}
