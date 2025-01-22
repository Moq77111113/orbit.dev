<script lang="ts">
  import * as Popover from '$lib/components/ui/popover/index.js';
  import Separator from '$lib/components/ui/separator/separator.svelte';

  import { Icons } from '$lib/icons/index.js';

  import MenuNav from '../molecules/menu-nav.svelte';
  import MenuTriggers from '../molecules/menu-triggers.svelte';
  import { exportMenu } from './config/menus.svelte';
  import MenuTabs from './menu-tabs.svelte';

  let anchor = $state<HTMLDivElement>();

  let openElement = $state<'menu' | 'customization' | null>(null);

  const triggers = [
    {
      name: 'menu',
      icon: Icons.hamburger,
      onclick: () => open('menu'),
    },
    {
      name: 'customization',
      icon: Icons.theme,
      onclick: () => open('customization'),
    },
  ];
  const open = (element: typeof openElement) => {
    openElement = element;
  };
</script>

<div class="hidden md:flex z-10">
  <div class="absolute top-16 left-4 h-0" bind:this={anchor}></div>
  <Popover.Root>
    <MenuTriggers class="absolute bottom-16 left-4" {triggers} />

    <Popover.Content
      class="h-[75svh] overflow-auto ml-4 rounded-xl p-2"
      customAnchor={anchor}
    >
      {#if openElement === 'customization'}
        <MenuTabs />
      {/if}

      {#if openElement === 'menu'}
        <MenuNav links={exportMenu} />
        <Separator />
        <MenuNav links={exportMenu} />
      {/if}
    </Popover.Content>
  </Popover.Root>
</div>
