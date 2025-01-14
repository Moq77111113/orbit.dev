<script lang="ts" module>
  type T = { id: string; name: string };
  export type SelectProps = {
    name: string;
    label: string;
    value: string;
    placeholder: string;
    items: T[];
  } & Record<string, unknown>;
</script>

<script lang="ts" generics="T extends {id: string, name: string}">
  import * as Form from '$lib/components/ui/form/index.js';
  import * as Select from '$lib/components/ui/select/index.js';

  let {
    label,
    value = $bindable(),
    name,
    placeholder,
    items,
    ...rest
  }: SelectProps = $props();
</script>

<Form.Label>{label}</Form.Label>
<Select.Root type="single" bind:value name={label}>
  <Select.Trigger {...rest}>
    {value ? items.find((item) => item.id === value)?.name : placeholder}
  </Select.Trigger>
  <Select.Content>
    {#each items as item (item.id)}
      <Select.Item value={item.id}>{item.name}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
