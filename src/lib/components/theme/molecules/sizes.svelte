<script lang="ts" generics="T extends string">
  import LabeledSlider, {
    type SliderProps,
  } from '$lib/components/shared/molecules/labeled-slider.svelte';

  import { entries } from '$lib/utils/object.js';

  type Props = {
    sizes: Record<T, Omit<SliderProps, 'onchange'>>;
    onChange(key: T, size: number): void;
  };

  const { sizes, onChange }: Props = $props();
</script>

{#each entries(sizes) as [key, size] (key)}
  <div class="flex w-full gap-4 justify-between items-center px-6 space-x-4">
    <LabeledSlider {...size} onchange={(value) => onChange(key, value)} />
  </div>
{/each}
