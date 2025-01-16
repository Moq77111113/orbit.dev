<script lang="ts">
  import Entries from '$lib/components/radar/entry/organisms/entries.svelte';
  import Rings from '$lib/components/radar/ring/organisms/rings.svelte';
  import Sections from '$lib/components/radar/section/organisms/sections.svelte';

  import { useToolbar } from '$lib/components/ui/toolbar/toolbar.svelte.js';
  import { Icons } from '$lib/icons/index.js';
  import MobileList from '../molecules/mobile-list.svelte';

  const toolbar = useToolbar();

  const themeActions = [
    {
      title: 'Sections',
      icon: Icons.section,
      handle: () =>
        toolbar.push({
          content: Sections,
          props: {},
          title: 'Sections',
        }),
    },
    {
      title: 'Rings',
      icon: Icons.ring,
      handle: () => {
        toolbar.push({
          content: Rings,
          props: {},
          title: 'Rings',
        });
      },
    },
    {
      title: 'Entries',
      icon: Icons.entry,
      handle: () => {
        toolbar.push({
          content: Entries,
          props: {},
          title: 'Entries',
        });
      },
    },
  ];
</script>

<MobileList actions={themeActions} />
