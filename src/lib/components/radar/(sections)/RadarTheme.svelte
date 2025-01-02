<script lang="ts">
  import Input from '$lib/components/ui/input/input.svelte';
  import { Label } from '$lib/components/ui/label/index.js';
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
  <div class="flex w-full max-w-sm gap-4 items-center px-6 space-x-4">
    <Label for={key} class="capitalize">{key}</Label>
    <Input
      id={key}
      class="h-8"
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

{#each ['grid', 'ring', 'text'] as const as key}
  {@render color(key)}
{/each}
