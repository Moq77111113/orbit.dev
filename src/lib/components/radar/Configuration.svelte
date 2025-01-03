<script lang="ts">
  import LayoutGrid from 'lucide-svelte/icons/layout-grid';
  import Colors from 'lucide-svelte/icons/palette';
  import Radar from 'lucide-svelte/icons/radar';
  import Shell from 'lucide-svelte/icons/shell';
  import Separator from '../ui/separator/separator.svelte';
  import RadarLayout from './(conf)/RadarLayout.svelte';
  import RadarRings from './(conf)/RadarRings.svelte';
  import RadarSections from './(conf)/RadarSections.svelte';
  import RadarTheme from './(conf)/RadarTheme.svelte';
  import SidebarElement from './SidebarElement.svelte';

  const sections = $state([
    { title: 'Theme', icon: Colors, component: RadarTheme },
    { title: 'Layout', icon: LayoutGrid, component: RadarLayout },
    { title: 'Sections', icon: Radar, component: RadarSections },
    { title: 'Rings', icon: Shell, component: RadarRings },
  ]);
</script>

{#each sections as { title, icon, component }, i}
  <SidebarElement {title} {icon}>
    {@const Section = component}
    <Section />
  </SidebarElement>
  {#if i < sections.length - 1}
    <Separator />
  {/if}
{/each}
