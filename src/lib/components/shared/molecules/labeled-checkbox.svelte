<script lang="ts">
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

  import Labeled from '../atoms/labeled-field.svelte';

  export type CheckboxFieldProps = {
    label: string;
    value: boolean;
    id: string;
    class?: string;
  };

  let {
    label,
    value = $bindable<boolean>(),
    id,
    class: clazz,
  }: CheckboxFieldProps = $props();
</script>

<Labeled {label} {id} class="space-x-2">
  <Checkbox {id} class={clazz} bind:checked={value} />
</Labeled>
