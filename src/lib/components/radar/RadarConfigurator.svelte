<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ChevronBoth from 'lucide-svelte/icons/chevrons-up-down';
  import Colors from 'lucide-svelte/icons/palette';
  import Radar from 'lucide-svelte/icons/radar';
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
    <SidebarElement title={'Color'} icon={Colors}>
      <RadarTheme />
    </SidebarElement>
    <Separator />
    <SidebarElement title={'Layout'} icon={ChevronBoth}>
      <RadarLayout />
    </SidebarElement>
    <Separator />
    <SidebarElement title={'Sections'} icon={Radar}>
      <RadarSections />
    </SidebarElement>
    <Separator />
    <SidebarElement title={'Rings'} icon={Radar}>
      <RadarRings />
    </SidebarElement>
    <Separator />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
