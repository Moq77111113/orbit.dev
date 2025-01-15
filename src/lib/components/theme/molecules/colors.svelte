<script lang="ts" generics="T extends string">
  import LabeledInput from '$lib/components/shared/molecules/labeled-input.svelte';

  import { entries } from '$lib/utils/object.js';

  type Props = {
    colors: Record<T, string>;
    onChange: (key: T, color: string) => void;
  };

  const { colors, onChange }: Props = $props();
</script>

{#each entries(colors) as [key, value] (key)}
  <div
    class="flex w-full max-w-sm gap-4 justify-between items-center px-6 space-x-4"
  >
    <LabeledInput
      type="color"
      class="w-14"
      label={key}
      {value}
      id={key}
      onchange={(e) => onChange(key, e.currentTarget.value)}
    />
  </div>
{/each}
