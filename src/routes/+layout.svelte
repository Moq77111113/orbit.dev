<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import '../app.css';
  import Footer from '$lib/components/shared/organisms/footer.svelte';
  import Header from '$lib/components/shared/organisms/header.svelte';
  import { createRadarState } from '$lib/radar/state/state.svelte.js';

  const { children } = $props();

  createRadarState({
    app: 'radar',
  });
</script>

<div class="relative flex min-h-screen flex-col">
  <Header />

    {@render children?.()}

  <Footer />
</div>
