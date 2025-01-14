<script lang="ts">
  import LabeledInput, {
    type CheckboxFieldProps,
  } from './labeled.input.svelte';

  type Props = Omit<CheckboxFieldProps, 'type'>;
  let { label, value = $bindable(), id, ...rest }: Props = $props();
</script>

<LabeledInput {label} {value} {id} type="color" {...rest} />
