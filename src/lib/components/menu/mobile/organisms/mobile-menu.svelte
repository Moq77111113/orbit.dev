<script lang="ts">
  import Settings from '$lib/components/settings/organisms/settings.svelte';
  import * as Toolbar from '$lib/components/ui/toolbar/index.js';
  import {
    type StackItem,
    useToolbar,
  } from '$lib/components/ui/toolbar/toolbar.svelte.js';
  import { Icons } from '../../../../icons/index.js';
  import { cn } from '$lib/utils/ui.js';
  import MobileActions from '../molecules/mobile-actions.svelte';

  import RadarList from './radar-list.svelte';

  import ThemeList from './theme-list.svelte';

  const toolbar = useToolbar();

  let currentMenu = $state<(typeof actions)[number]['title'] | null>(null);

  const addOrClose = (item: StackItem) => {
    if (toolbar.island && currentMenu === item.title) {
      toolbar.clearStack();
      toolbar.setOpen(false);
      currentMenu = null;
      return;
    }

    if (currentMenu !== item.title) {
      toolbar.clearStack();
    }

    toolbar.push(item);
    toolbar.setOpen(true);
    currentMenu = item.title?.toString() ?? null;
  };
  const actions = [
    {
      title: 'Menu',
      icon: Icons.hamburger,
      handle: () =>
        addOrClose({ content: Settings, props: {}, title: 'Settings' }),
      class:
        'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    },
    {
      title: 'Theming',
      icon: Icons.theme,
      handle: () =>
        addOrClose({ content: ThemeList, props: {}, title: 'Theme' }),
    },
    {
      title: 'Radar',
      icon: Icons.radar,
      handle: () =>
        addOrClose({ content: RadarList, props: {}, title: 'Radar' }),
    },
  ];
</script>

<Toolbar.Island />
<Toolbar.Inset class={cn('px-4 relative')}>
  <MobileActions {actions} />
</Toolbar.Inset>
