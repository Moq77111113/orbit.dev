<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import Labeled from '../atoms/labeled.svelte';

  export type TextAreaFieldProps = {
    label: string;
    value: string;
    id: string;
  } & HTMLTextareaAttributes;

  let {
    label,
    value = $bindable(),
    id,
    class: clazz,

    ...rest
  }: TextAreaFieldProps = $props();
</script>

<Labeled {label} {id}>
  <Textarea {id} {...rest} class={clazz} bind:value />
</Labeled>
