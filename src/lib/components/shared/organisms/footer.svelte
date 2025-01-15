<script lang="ts">
  import { site } from '$lib/config/site.js';
</script>

<footer
  class="py-6 md:px-8 md:py-0 bg-muted text-muted-foreground shadow-inner z-10"
>
  <div
    class="container flex h-14 max-w-screen-2xl items-center justify-center text-xs font-hand"
  >
    {site.name} © {new Date().getFullYear()}
  </div>
</footer>
