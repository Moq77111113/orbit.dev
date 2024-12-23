<script lang="ts">
  import Radar from '~/lib/components/radar/RadarSvg.svelte';

  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import Configurator from '~/lib/components/radar/RadarConfigurator.svelte';
  import { data } from '~/lib/utils/radar.conf.js';

  import { createRadarState } from '~/lib/components/radar/context.svelte.js';
  import { RadarService } from '~/lib/radar/radar.js';
  import '../app.css';

  createRadarState({
    radar: new RadarService(data),
  });
</script>

<Sidebar.Provider>
  <Configurator />
  <main>
    <Sidebar.Trigger />

    <Radar />
  </main>
</Sidebar.Provider>
