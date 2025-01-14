<script lang="ts">
  import LabeledSlider, {
    type SliderProps,
  } from '$lib/components/molecules/labeled.slider.svelte';

  import { changeThemeSize } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';

  import { entries } from '$lib/utils/object.js';

  const radar = useRadar();

  const sizes = $derived(radar.state.radarConfig.theme.sizes);

  const sizeWithParameters = {
    entry: { min: 0, max: 100, step: 10, label: 'entry' },
    strokeWidth: { min: 1, max: 5, step: 1, label: 'stroke' },
  } as const satisfies Record<keyof typeof sizes, Omit<SliderProps, 'value'>>;
</script>

{#each entries(sizeWithParameters) as [key, size] (key)}
  <div
    class="flex w-full max-w-sm gap-4 justify-between items-center px-6 space-x-4"
  >
    <LabeledSlider
      {...size}
      value={sizes[key]}
      onchange={(value) => radar.execute(changeThemeSize, { key, size: value })}
    />
  </div>
{/each}
