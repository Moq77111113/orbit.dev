<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { createRadarState } from '~/lib/components/radar/context.svelte.js';
  import '../app.css';
  import Footer from '~/lib/components/footer.svelte';
  import Header from '~/lib/components/header.svelte';
  import { RadarService } from '~/lib/radar/radar.js';
  import { data } from '~/lib/utils/radar.conf.js';

  const { children } = $props();

  createRadarState({
    radar: new RadarService(data),
  });
</script>

<div class="relative flex min-h-screen flex-col">
  <Header />
  <Sidebar.Provider class="flex flex-1">
    {@render children?.()}
  </Sidebar.Provider>
  <Footer />
</div>
