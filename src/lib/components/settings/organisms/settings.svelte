<script lang="ts">
  import RadarBackground from '$lib/components/shared/organisms/radar-background.svelte';
  import Theme from '$lib/components/shared/organisms/theme-switch.svelte';
  import { site } from '$lib/config/site.js';
  import { Icons } from '../../../icons/index.js';
  import SettingSection from '../molecules/setting-section.svelte';

  import SettingSections from '../molecules/setting-sections.svelte';

  const primary = {
    component: SettingSection,
    props: {
      links: [
        {
          title: 'Save to...',
          icon: Icons.download,
          onclick: () => {},
        },
        { title: 'Clear Radar', icon: Icons.trash, onclick: () => {} },
        { title: 'Share', icon: Icons.share, onclick: () => {} },
      ],
    },
  };
  const links = {
    component: SettingSection,
    props: {
      links: site.links.map((_) => ({
        title: _.label,
        href: _.href,
        icon: _.icon,
      })),
    },
  };

  const theme = {
    component: Theme,
    props: {},
  };

  const svgBackground = {
    component: RadarBackground,
    props: {},
  };
</script>

<SettingSections sections={[primary, links, theme, svgBackground]} />
