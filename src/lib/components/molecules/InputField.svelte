<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '../ui/input/index.js';

  type Props = {
    label: string;
    value: string;
    id: string;
  } & Record<string, unknown>;

  let { label, value = $bindable(''), id, ...rest }: Props = $props();
</script>

<Form.Label for={id}>{label}</Form.Label>
<Input id={id} {...rest} bind:value />
