<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ChevronBoth from 'lucide-svelte/icons/chevrons-up-down';
  import RadarTheme from './(sections)/RadarTheme.svelte';
  import SidebarElement from './SidebarElement.svelte';
</script>

<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />

    <SidebarElement title={'Layout'} icon={ChevronBoth}>
      <RadarTheme />
    </SidebarElement>
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
