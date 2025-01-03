<script lang="ts">
  import Radar from '~/lib/components/radar/RadarSvg.svelte';

  import { onMount } from 'svelte';

  import { useSidebar } from '$lib/components/ui/sidebar/index.js';
  import Menu from '~/lib/components/radar/Menu.svelte';
  import Button from '~/lib/components/ui/button/button.svelte';
  let pageWidth = $state(0);
  let pageHeight = $state(0);
  let loading = $state(true);
  const { toggle } = useSidebar();
  const setRadarDimensions = () => {
    pageWidth = window.innerWidth - 16 * 16;
    pageHeight = window.innerHeight - 56 * 2;
  };
  onMount(() => {
    setRadarDimensions();
    loading = false;
  });
</script>

<svelte:window on:resize={setRadarDimensions} />

<Menu />
<main class="flex flex-col items-center justify-center">
  Test
  {#if loading}
    <div class="flex justify-center items-center">
      <div
        class="animate-spin rounded-full size-32 border-t-2 border-b-2 border-gray-900"
      ></div>
    </div>
  {:else}
    <Radar bind:width={pageWidth} bind:height={pageHeight} />
  {/if}
</main>

<Button
  class="absolute bottom-16 left-4"
  variant={'outline'}
  size={'icon'}
  onclick={toggle}>0</Button
>
