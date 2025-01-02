<script lang="ts">
  import Radar from '~/lib/components/radar/RadarSvg.svelte';

  import * as Sidebar from '$lib/components/ui/sidebar/index.js';

  import { onMount } from 'svelte';
  import '../app.css';
  import Entries from '~/lib/components/radar/(entries)/Entries.svelte';
  import RadarConfigurator from '~/lib/components/radar/RadarConfigurator.svelte';
  import Button from '~/lib/components/ui/button/button.svelte';

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
  <Sidebar.Trigger />
  <RadarConfigurator />
  <main class="flex flex-col w-full min-h-svh">
    {#if loading}
      <div class="flex justify-center items-center">
        <div
          class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
        ></div>
      </div>
    {:else}
      <Button
        href="/entries"
        data-sveltekit-preload-data="hover"
        class="mb-4"
        variant="link">Entries</Button
      >
      <Radar bind:width={pageWidth} bind:height={pageHeight} />
    {/if}
  </main>
</Sidebar.Provider>
<section class="container"><Entries /></section>
