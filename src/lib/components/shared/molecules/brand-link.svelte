<script lang="ts">
  import { routes } from '$lib/config/routes.js';
  import Logo from '../atoms/logo-icon.svelte';
</script>

<a href={routes.home} class="mr-6 flex items-center space-x-2 text-primary">
  <Logo />
  <span class="inline-block font-hand tracking-widest text-lg font-medium">
    Orbit.dev
  </span>
</a>
