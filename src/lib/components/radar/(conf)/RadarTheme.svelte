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
</script>

{#snippet color(key: Color)}
  <div
    class="flex w-full max-w-sm gap-4 justify-between items-center px-6 space-x-4"
  >
    <Label for={key} class="capitalize">{key}</Label>
    <Input
      class="h-8 w-12"
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

{#each ['grid', 'text'] as const as key}
  {@render color(key)}
{/each}

<div
  class="flex w-full max-w-sm gap-4 justify-between items-center px-6 space-x-4"
>
  <Label class="capitalize">Entry Size</Label>
  <Slider.Root
    type="single"
    onValueChange={(v) => {
      updateTheme('sizes', { ...radar.theme.sizes, entry: v[0] });
    }}
    class="w-full"
    min={0}
    max={100}
    step={1}
    value={[radar.theme.sizes.entry]}
  />
</div>
