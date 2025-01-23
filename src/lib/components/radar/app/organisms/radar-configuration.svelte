<script lang="ts">
  import MenuSection from '$lib/components/menu/molecules/menu-section.svelte';
  import Rings from '$lib/components/radar/ring/organisms/rings.svelte';
  import Sections from '$lib/components/radar/section/organisms/sections.svelte';

  import Placement from '$lib/components/theme/organisms/placement.svelte';
  import Theme from '$lib/components/theme/organisms/radar-theme.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { Icons } from '../../../../icons/index.js';

  const sections = [
    { title: 'Theme', icon: Icons.theme, component: Theme },
    { title: 'Layout', icon: Icons.layout, component: Placement },
    { title: 'Sections', icon: Icons.section, component: Sections },
    { title: 'Rings', icon: Icons.ring, component: Rings },
  ];
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
