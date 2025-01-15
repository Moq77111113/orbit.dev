<script lang="ts">
  import Rings from '$lib/components/features/ring/organisms/rings.svelte';
  import Sections from '$lib/components/features/section/organisms/sections.svelte';
  import MenuSection from '$lib/components/menu/molecules/menu-section.svelte';
  import Placement from '$lib/components/theme/organisms/placement.svelte';
  import Theme from '$lib/components/theme/organisms/theme.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import LayoutGrid from 'lucide-svelte/icons/layout-grid';
  import Colors from 'lucide-svelte/icons/palette';
  import Radar from 'lucide-svelte/icons/radar';
  import Shell from 'lucide-svelte/icons/shell';

  const sections = $state([
    { title: 'Theme', icon: Colors, component: Theme },
    { title: 'Layout', icon: LayoutGrid, component: Placement },
    { title: 'Sections', icon: Radar, component: Sections },
    { title: 'Rings', icon: Shell, component: Rings },
  ]);
</script>

<section class="space-y-2">
  {#each sections as { title, icon, component }, i}
    <MenuSection {title} {icon}>
      {@const Section = component}
      <Section />
    </MenuSection>
    {#if i < sections.length - 1}
      <Separator />
    {/if}
  {/each}
</section>
