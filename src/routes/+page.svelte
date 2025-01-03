<script lang="ts">
  import Radar from '~/lib/components/radar/RadarSvg.svelte';

  import * as Sidebar from '$lib/components/ui/sidebar/index.js';

  import { onMount } from 'svelte';
  import '../app.css';
  import RadarConfigurator from '~/lib/components/radar/Menu.svelte';

  let pageWidth = $state(0);
  let pageHeight = $state(0);
  let loading = $state(true);

  const setRadarDimensions = () => {
    pageWidth = window.innerWidth - 16 * 16;
    pageHeight = window.innerHeight - 4 * 16;
  };
  onMount(() => {
    setRadarDimensions();
    loading = false;
  });
</script>

<svelte:window on:resize={setRadarDimensions} />
<Sidebar.Provider>
  <RadarConfigurator />
  <Sidebar.Trigger />
  <main class="flex flex-col items-center justify-center h-full w-full min-h-svh">
   

    {#if loading}
      <div class="flex justify-center items-center h-full">
        <div
          class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
        ></div>
      </div>
    {:else}
      <Radar bind:width={pageWidth} bind:height={pageHeight} />
    {/if}
  </main>
</Sidebar.Provider>
