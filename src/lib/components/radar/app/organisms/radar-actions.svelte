<script lang="ts">
  import ButtonDownload from '$lib/components/radar/app/atoms/button-download.svelte';
  import { clipJson } from '$lib/radar/features/actions/clip/actionClipJson.js';
  import { exportJson } from '$lib/radar/features/actions/export/actionExportJson.js';
  import { exportPng } from '$lib/radar/features/actions/export/actionExportPng.js';
  import { exportSvg } from '$lib/radar/features/actions/index.js';
  import { useOrbit } from '$lib/radar/state/state.svelte.js';
  import { cn } from '$lib/utils/ui.js';

  type Props = {
    class?: string;
  };
  const { class: clazz }: Props = $props();
  const orbit = useOrbit();

  function getRadarSvg() {
    const svg = document.querySelector<SVGElement>('#radar');
    if (!svg) {
      throw new Error('SVG element not found');
    }
    return svg;
  }
  const actions = [
    {
      title: 'Download SVG',
      onclick: () => orbit.execute(exportSvg, getRadarSvg()),
      class: 'bg-primary',
    },
    {
      title: 'Download PNG',
      onclick: () => orbit.execute(exportPng, getRadarSvg()),
      class: 'bg-secondary',
    },
    {
      title: 'Download JSON',
      onclick: () => orbit.execute(clipJson, undefined),
      class: 'bg-muted text-muted-foreground',
    },
  ];
</script>

<div class={cn('flex justify-end space-x-4', clazz)}>
  {#each actions as action}
    <ButtonDownload
      title={action.title}
      class={action.class}
      download={() => action.onclick()}
    />
  {/each}
</div>
