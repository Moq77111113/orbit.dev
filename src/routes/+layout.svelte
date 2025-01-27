<script lang="ts">
  import '../app.css';

  import Footer from '$lib/components/shared/organisms/footer.svelte';
  import Header from '$lib/components/shared/organisms/header.svelte';
  import { createBackgroundStore } from '$lib/hooks/svg-background.svelte.js';
  import { createTheme } from '$lib/hooks/theme.svelte.js';


  const { children } = $props();
    createTheme();
    createBackgroundStore();


</script>


<div class="relative flex min-h-screen flex-col">
  <Header />

  {@render children?.()}

  <Footer />
</div>
