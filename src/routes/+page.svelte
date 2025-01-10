<script lang="ts">
  import Radar from '$lib/components/radar/RadarSvg.svelte';

  import { useSidebar } from '$lib/components/ui/sidebar/index.js';
  import Panel from 'lucide-svelte/icons/panel-right-open';

  import Button from '$lib/components/ui/button/button.svelte';

  import Menu from '$lib/components/radar/Menu.svelte';
  import { cn } from '$lib/utils/ui.js';
  import { onMount } from 'svelte';

  let loading = $state(true);
  const sidebar = useSidebar();

  onMount(() => {
    loading = false;
  });
</script>

<Menu />
<main class="flex flex-1 flex-col items-center justify-center">
  {#if loading}
    <div class="flex justify-center items-center">
      <div
        class="animate-spin rounded-full size-32 border-t-2 border-b-2 border-gray-900"
      ></div>
    </div>
  {:else}
    <Radar maxWidth={1000} aspectRatio={0.8} />
  {/if}
</main>

<Button
  class="absolute bottom-16 left-2"
  variant={'outline'}
  size={'icon'}
  onclick={sidebar.toggle}
  ><Panel
    class={cn(
      !sidebar.open && 'rotate-180',
      'transition-transform duration-300 ease-in-out '
    )}
  /></Button
>
