<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import { Input } from '$lib/components/ui/input/index.js';
  import Labeled from '../atoms/labeled-field.svelte';

  export type InputFieldProps = {
    label: string;
    value: string;
    id: string;
  } & HTMLInputAttributes;

  let {
    label,
    value = $bindable(),
    id,
    class: clazz,
    ...rest
  }: InputFieldProps = $props();
</script>

<Labeled {label} {id}>
  <Input {id} {...rest} class={clazz} bind:value />
</Labeled>
