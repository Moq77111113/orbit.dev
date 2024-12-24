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
  onMount(() => {
    pageWidth = window.innerWidth - 16 * 16;
    pageHeight = window.innerHeight - 4 * 16;
  });
</script>

<Sidebar.Provider>
  <Configurator />
  <main>
    <Sidebar.Trigger />

    <Radar bind:width={pageWidth} bind:height={pageHeight} />
  </main>
</Sidebar.Provider>
