<script lang="ts">
  import Placement from '$lib/components/theme/organisms/placement.svelte';
  import Theme from '$lib/components/theme/organisms/theme.svelte';
  import { useToolbar } from '$lib/components/ui/toolbar/toolbar.svelte.js';
  import { Icons } from '../../../../icons/index.js';
  import MobileList from '../molecules/mobile-list.svelte';

  const toolbar = useToolbar();
  const themeActions = [
    {
      title: 'Layout',
      icon: Icons.layout,
      handle: () =>
        toolbar.push({
          content: Placement,
          props: {},
          title: 'Layout',
        }),
    },
    {
      title: 'Theme',
      icon: Icons.theme,
      handle: () => {
        toolbar.push({
          content: Theme,
          props: {},
          title: 'Theme',
        });
      },
    },
  ];
</script>

<MobileList actions={themeActions} />
