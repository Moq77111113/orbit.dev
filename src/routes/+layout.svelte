<script lang="ts">
  import '../app.css';
  import Footer from '$lib/components/shared/organisms/footer.svelte';
  import Header from '$lib/components/shared/organisms/header.svelte';

  const { children } = $props();
</script>

<div class="relative flex min-h-screen flex-col">
  <Header />

  {@render children?.()}

  <Footer />
</div>
