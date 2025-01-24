<script lang="ts">
  import { site } from '$lib/config/site.js';
  import BrandLink from '../molecules/brand-link.svelte';
  import Navbar from '../molecules/navbar.svelte';
</script>

<header
  class="border-border/40 bg-muted supports-[backdrop-filter]:bg-muted shadow-inner sticky top-0 z-50 w-full border-b backdrop-blur"
>
  <div
    class="container flex h-14 max-w-screen-2xl items-center justify-between"
  >
    <div class="flex mr-4 border-r">
      <BrandLink />
    </div>
    <div class="flex flex-1 items-center space-x-2 justify-end">
      <Navbar links={site.links} />
    </div>
  </div>
</header>
