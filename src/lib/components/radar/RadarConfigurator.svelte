<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ChevronBoth from 'lucide-svelte/icons/chevrons-up-down';
  import Colors from 'lucide-svelte/icons/palette';
  import RadarLayout from './(sections)/RadarLayout.svelte';
  import RadarTheme from './(sections)/RadarTheme.svelte';
  import SidebarElement from './SidebarElement.svelte';
</script>

<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />

    <SidebarElement title={'Color'} icon={Colors}>
      <RadarTheme />
    </SidebarElement>
    <SidebarElement title={'Layout'} icon={ChevronBoth}>
      <RadarLayout />
    </SidebarElement>
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
