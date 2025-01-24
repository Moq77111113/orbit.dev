<script lang="ts">
  import Separator from '$lib/components/ui/separator/separator.svelte';

  import SettingSections from '../molecules/setting-sections.svelte';
  import PrimaryLinks from './primary-links.svelte';
  import SiteLinks from './site-links.svelte';
  import ThemeSettings from './theme-settings.svelte';
</script>

<SettingSections>
  <PrimaryLinks />
  <Separator />
  <SiteLinks />
  <Separator />
  <ThemeSettings />
</SettingSections>
