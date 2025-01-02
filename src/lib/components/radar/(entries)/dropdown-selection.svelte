<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';

  const {
    value: initial,
    values,
    onChange,
  }: {
    value: string;
    values: string[];
    onChange: (v: string) => void;
  } = $props();

  let value = $state(initial);
</script>

<Select.Root type="single" {value} onValueChange={onChange}>
  <Select.Trigger >{value}</Select.Trigger>
  <Select.Content>
    {#each values as option (option)}
      <Select.Item value={option}>{option}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
