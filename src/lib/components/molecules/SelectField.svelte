<script lang="ts" generics="T extends {id: string, name: string}">
  import * as Form from '$lib/components/ui/form/index.js';
  import * as Select from '$lib/components/ui/select/index.js';

  type Props = {
    name: string;
    label: string;
    value: string;
    placeholder: string;
    items: T[];
  } & Record<string, unknown>;

  let { label, value, name, placeholder, items, ...rest }: Props = $props();
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
