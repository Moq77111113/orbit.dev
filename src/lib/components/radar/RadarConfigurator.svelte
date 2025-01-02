<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import LayoutGrid from 'lucide-svelte/icons/layout-grid';
  import Colors from 'lucide-svelte/icons/palette';
  import Radar from 'lucide-svelte/icons/radar';
  import Shell from 'lucide-svelte/icons/shell';
  import Separator from '../ui/separator/separator.svelte';
  import RadarLayout from './(sections)/RadarLayout.svelte';
  import RadarRings from './(sections)/RadarRings.svelte';
  import RadarSections from './(sections)/RadarSections.svelte';
  import RadarTheme from './(sections)/RadarTheme.svelte';
  import SidebarElement from './SidebarElement.svelte';
</script>

<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content class="px-2">
    <Sidebar.Group />
    <Sidebar.Group />
    <SidebarElement title={'Theme'} icon={Colors}>
      <RadarTheme />
    </SidebarElement>
    <Separator />
    <SidebarElement title={'Layout'} icon={LayoutGrid}>
      <RadarLayout />
    </SidebarElement>
    <Separator />
    <SidebarElement title={'Sections'} icon={Radar}>
      <RadarSections />
    </SidebarElement>
    <Separator />
    <SidebarElement title={'Rings'} icon={Shell}>
      <RadarRings />
    </SidebarElement>
    <Separator />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
