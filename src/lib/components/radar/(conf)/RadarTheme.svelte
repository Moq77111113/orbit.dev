<script lang="ts">
  import Input from '$lib/components/ui/input/input.svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Slider from '$lib/components/ui/slider/index.js';
  import type { RadarTheme } from '~/types/theme.js';
  import { useRadar } from '../context.svelte.js';
  const radar = useRadar();

  const updateTheme = <T extends keyof RadarTheme>(
    key: T,
    value: RadarTheme[T]
  ) => {
    radar.changeTheme({ ...radar.theme, [key]: value });
  };

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
      value={radar.theme.colors[key]}
      onchange={(e) =>
        updateTheme('colors', {
          ...radar.theme.colors,
          [key]: e.currentTarget.value,
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
        updateTheme('sizes', { ...radar.theme.sizes, [key]: v });
      }}
      class="w-full"
      {min}
      {max}
      {step}
      value={radar.theme.sizes[key]}
    />
  </div>
{/snippet}

{#each sliders as { key, min, max, label, step }}
  {@render slide({ key, min, max, label, step })}
{/each}
