<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import '../app.css';
  import Footer from '$lib/components/footer.svelte';
  import Header from '$lib/components/header.svelte';
  import { createRadarState } from '$lib/radar/state/state.svelte.js';

  const { children } = $props();

  createRadarState({
    app: 'radar',
  });
</script>

<div class="relative flex min-h-screen flex-col">
  <Header />
  <Sidebar.Provider class="flex flex-1">
    {@render children?.()}
  </Sidebar.Provider>
  <Footer />
</div>
