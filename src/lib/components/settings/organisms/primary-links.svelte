<script lang="ts">
  import { useBackgroundStore } from '$lib/hooks/svg-background.svelte.js';
  import { Icons } from '$lib/icons/index.js';
  import { clipJson } from '$lib/radar/features/actions/clip/actionClipJson.js';
  import { clipSvg } from '$lib/radar/features/actions/clip/actionClipSvg.js';
  import { exportJson } from '$lib/radar/features/actions/export/actionExportJson.js';
  import { clearRadar } from '$lib/radar/features/actions/global/actionRadarClear.js';
  import { randomizeRadar } from '$lib/radar/features/actions/global/actionRandomizeRadar.js';
  import { exportPng, exportSvg } from '$lib/radar/features/actions/index.js';
  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';
  import { secureOnly } from '$lib/utils/secure.js';
  import type { NavElement } from '../atoms/setting-item.svelte';

  import NavLinks from '../molecules/nav-links.svelte';
  import type { SaveMenuOption } from '../molecules/save-menu.svelte';
  import SaveMenu from '../molecules/save-menu.svelte';

  const orbit = useOrbit();
  const background = useBackgroundStore();
  let exportOpen = $state(false);

  const primary = $state<NavElement[]>([
    {
      title: 'Save to...',
      icon: Icons.download,
      onclick: () => {
        if (orbit.state.vector) {
          exportOpen = true;
        }
      },
      disabled: !orbit.state.vector,
    },
  ]);

  if (!orbit.readonly) {
    primary.push(
      {
        title: 'Clear Radar',
        icon: Icons.trash,
        onclick: () => orbit.execute(clearRadar, undefined),
      },
      {
        title: 'Randomize Radar',
        icon: Icons.shuffle,
        onclick: () => orbit.execute(randomizeRadar, undefined),
      }
    );
  }

  const exports = [
    {
      title: 'SVG',
      description: 'Export as a Scalable Vector Graphic',
      icon: Icons.svg,
      export: (svg: SVGElement) => {
        orbit.execute(exportSvg, svg);
      },
      copy: secureOnly((svg: SVGElement) => {
        orbit.execute(clipSvg, svg);
      }),
    },
    {
      title: 'PNG',
      description: 'Export as a Portable Network Graphic',
      icon: Icons.png,
      export: (svg: SVGElement) => {
        orbit.execute(exportPng, { svg, background: background.value });
      },
    },
    {
      title: 'JSON',
      description: 'Export as a JSON file in our custom format',
      icon: Icons.json,
      export: () => {
        orbit.execute(exportJson, undefined);
      },
      copy: secureOnly(() => {
        orbit.execute(clipJson, undefined);
      }),
    },
  ] satisfies [SaveMenuOption, SaveMenuOption?, SaveMenuOption?];
</script>

<NavLinks links={primary} />

{#if orbit.state.vector}
  <SaveMenu svg={orbit.state.vector} bind:open={exportOpen} options={exports} />
{/if}
