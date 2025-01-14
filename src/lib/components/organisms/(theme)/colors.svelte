<script lang="ts">
  import LabeledColor from '$lib/components/molecules/labeled-color.input.svelte';
  import { changeThemeColor } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';

  import { entries } from '$lib/utils/object.js';

  const radar = useRadar();

  const colors = $derived(radar.state.radarConfig.theme.colors);
</script>

{#each entries(colors) as [key, value] (key)}
  <div
    class="flex w-full max-w-sm gap-4 justify-between items-center px-6 space-x-4"
  >
    <LabeledColor
      class="w-14"
      label={key}
      {value}
      id={key}
      onchange={(e) =>
        radar.execute(changeThemeColor, { key, color: e.currentTarget.value })}
    />
  </div>
{/each}
