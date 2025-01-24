<script lang="ts">
  import Radar from '$lib/components/radar/app/organisms/radar.svelte';
  import { createRandomRadar } from '$lib/radar/core/elements/stubs.js';
  import { createOrbitState } from '$lib/radar/state/app-state.svelte.js';
</script>

<main class="flex flex-1 flex-col items-center justify-center">
  <Radar />
</main>
