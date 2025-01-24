<script>
  import WriteOnly from '$lib/components/radar/app/organisms/write-only.svelte';
  import RadarBackground from '$lib/components/shared/organisms/radar-background.svelte';
  import ThemeSwitch from '$lib/components/shared/organisms/theme-switch.svelte';
  import SettingSection from '../molecules/setting-section.svelte';
</script>

<SettingSection>
  <ThemeSwitch />
  <WriteOnly>
    <RadarBackground />
  </WriteOnly>
</SettingSection>
