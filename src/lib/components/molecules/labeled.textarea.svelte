<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  import Labeled from '../atoms/labeled.svelte';
  import Textarea from '../ui/textarea/textarea.svelte';

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
