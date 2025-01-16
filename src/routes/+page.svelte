<script lang="ts">
  import Radar from '$lib/components/radar/app/organisms/radar.svelte';

  import { useSidebar } from '$lib/components/ui/sidebar/index.js';
  import Panel from 'lucide-svelte/icons/panel-right-open';

  import Button from '$lib/components/ui/button/button.svelte';

  import Menu from '$lib/components/menu/organisms/menu.svelte';
  import { Icons } from '$lib/icons/index.js';
  import { cn } from '$lib/utils/ui.js';
  import { onMount } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';

  let loading = $state(true);
  const sidebar = useSidebar();

  onMount(() => {
    loading = false;
  });

  const isMobile = new MediaQuery('(max-width: 640px)');
  const isTablet = new MediaQuery('(max-width: 768px)');
  const isDesktop = new MediaQuery('(max-width: 1024px)');
  const isLargeScreen = new MediaQuery('(min-width: 1024px)');

  let maxWidth = $state(1000);
  let aspectRatio = $state(0.8);
  const reisze = () => {
    if (isMobile.current) {
      aspectRatio = 1.5;
      maxWidth = 320;
    }

    aspectRatio = 0.8;

    if (isTablet.current) {
      maxWidth = 640;
    }

    if (isDesktop.current) {
      maxWidth = 800;
    }

    if (isLargeScreen.current) {
      maxWidth = window.innerWidth - 32;
    }
  };
</script>

<svelte:window on:resize={reisze} />

<Menu />

<main class="flex flex-1 flex-col items-center justify-center">
  <Radar {maxWidth} {aspectRatio} />
</main>
