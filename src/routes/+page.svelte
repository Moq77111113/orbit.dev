<script lang="ts">
  import Radar from '~/lib/components/radar/RadarSvg.svelte';

  import { useSidebar } from '$lib/components/ui/sidebar/index.js';
  import Panel from 'lucide-svelte/icons/panel-right-open';

  import { onMount } from 'svelte';
  import Menu from '~/lib/components/radar/Menu.svelte';
  import Button from '~/lib/components/ui/button/button.svelte';
  import {
    SIDEBAR_WIDTH,
    SIDEBAR_WIDTH_VALUE,
  } from '~/lib/components/ui/sidebar/constants.js';
  import { cn } from '~/lib/utils/ui.js';

  let pageWidth = $state(0);
  let pageHeight = $state(0);
  let loading = $state(true);
  const sidebar = useSidebar();

  const setRadarDimensions = () => {
    pageWidth = window.innerWidth - SIDEBAR_WIDTH_VALUE * 16;
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
  class="absolute bottom-16 left-2"
  variant={'outline'}
  size={'icon'}
  onclick={sidebar.toggle}
  ><Panel
    class={cn(
      !sidebar.open && 'rotate-180',
      ' transition-transform duration-300 ease-in-out '
    )}
  /></Button
>
