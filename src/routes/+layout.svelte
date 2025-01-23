<script lang="ts">
  import '../app.css';
  import PageLoading from '$lib/components/shared/atoms/page-loading.svelte';
  import Footer from '$lib/components/shared/organisms/footer.svelte';
  import Header from '$lib/components/shared/organisms/header.svelte';
  import { createBackgroundStore } from '$lib/hooks/svg-background.svelte.js';
  import { createTheme } from '$lib/hooks/theme.svelte.js';
  import { onMount } from 'svelte';

  const { children } = $props();

  let loading = $state(true);
  onMount(() => {
    loading = false;
    createTheme();
    createBackgroundStore();
  });
</script>

{#if loading}
  <PageLoading show />
{:else}
  <div class="relative flex min-h-screen flex-col">
    <Header />

    {@render children?.()}

    <Footer />
  </div>
{/if}
