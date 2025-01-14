<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '../ui/input/index.js';

  export type InputFieldProps = {
    label: string;
    value: string;
    id: string;
  } & Record<string, unknown>;

  let { label, value = $bindable(''), id, ...rest }: InputFieldProps = $props();
</script>

<Form.Label for={id}>{label}</Form.Label>
<Input {id} {...rest} bind:value />
