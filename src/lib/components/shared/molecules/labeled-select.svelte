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
  import * as Select from '$lib/components/ui/select/index.js';
  import Labeled from '../atoms/labeled-field.svelte';

  let {
    label,
    value = $bindable(),
    name,
    placeholder,
    items,
    ...rest
  }: SelectProps = $props();
</script>

<Labeled {label}>
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
</Labeled>
