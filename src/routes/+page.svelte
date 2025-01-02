<script lang="ts">
  import Radar from '~/lib/components/radar/RadarSvg.svelte';

  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import Configurator from '~/lib/components/radar/RadarConfigurator.svelte';
  import { data } from '~/lib/utils/radar.conf.js';

  import { onMount } from 'svelte';
  import { createRadarState } from '~/lib/components/radar/context.svelte.js';
  import { RadarService } from '~/lib/radar/radar.js';
  import '../app.css';

  createRadarState({
    radar: new RadarService(data),
  });

  let pageWidth = $state(0);
  let pageHeight = $state(0);
  let loading = $state(true);
  onMount(() => {
    pageWidth = window.innerWidth - 16 * 16;
    pageHeight = window.innerHeight - 4 * 16;
    loading = false;
  });
</script>

<Sidebar.Provider>
  <Configurator />
  <main class=" flex flex-col w-full min-h-svh">
    <Sidebar.Trigger />
    {#if loading}
      <div class="flex justify-center items-center">
        <div
          class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
        ></div>
      </div>
    {:else}
      <Radar bind:width={pageWidth} bind:height={pageHeight} />
    {/if}
  </main>
</Sidebar.Provider>
