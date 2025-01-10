<script lang="ts">
  import Input from '$lib/components/ui/input/input.svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Slider from '$lib/components/ui/slider/index.js';
  import type { RadarTheme } from '$lib/radar/core/config/types.js';
  import {
    changeThemeColor,
    changeThemeSize,
  } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';

  const radar = useRadar();

  const theme = $derived(radar.state.radarConfig.theme);

  type Color = keyof RadarTheme['colors'];
  type Size = keyof RadarTheme['sizes'];

  const colors: Color[] = ['grid', 'text'];

  type SliderProps = {
    key: Size;
    min: number;
    max: number;
    label: string;
    step?: number;
  };
  const sliders: SliderProps[] = [
    { key: 'entry', min: 0, max: 100, step: 10, label: 'entry' },
    { key: 'strokeWidth', label: 'Stroke', min: 1, max: 5, step: 1 },
  ];
</script>

{#snippet color(key: Color)}
  <div
    class="flex w-full max-w-sm gap-4 justify-between items-center px-6 space-x-4"
  >
    <Label for={key} class="capitalize">{key}</Label>
    <Input
      class="h-8 w-12 cursor-pointer"
      type="color"
      value={theme.colors[key]}
      onchange={(e) =>
        radar.execute(changeThemeColor, {
          key,
          color: e.currentTarget.value,
        })}
    />
  </div>
{/snippet}

{#each colors as key}
  {@render color(key)}
{/each}

{#snippet slide({ key, min, max, label = key, step = 1 }: SliderProps)}
  <div
    class="flex w-full max-w-sm gap-4 justify-between items-center px-6 space-x-4"
  >
    <Label class="capitalize text-sm">{label} Size</Label>
    <Slider.Root
      type="single"
      onValueChange={(v) => {
        radar.execute(changeThemeSize, { key, size: v });
      }}
      class="w-full cursor-pointer"
      {min}
      {max}
      {step}
      value={theme.sizes[key]}
    />
  </div>
{/snippet}

{#each sliders as { key, min, max, label, step }}
  {@render slide({ key, min, max, label, step })}
{/each}
