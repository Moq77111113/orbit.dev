<script lang="ts">
  import IconButton from '$lib/components/shared/atoms/icon-button.svelte';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { clipJson } from '$lib/radar/features/actions/clip/actionClipJson.js';
  import ArrowDown from 'lucide-svelte/icons/arrow-down-to-line';

  import Button from '$lib/components/ui/button/button.svelte';
  import { exportPng } from '$lib/radar/features/actions/export/actionExportPng.js';
  import { exportSvg } from '$lib/radar/features/actions/index.js';
  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';
  import { cn } from '$lib/utils/ui.js';

  type Props = {
    class?: string;
    svg: SVGElement;
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
      title: 'SVG',
      onclick: () => orbit.execute(exportSvg, getRadarSvg()),
    },
    {
      title: 'PNG',
      onclick: () =>
        orbit.execute(exportPng, { svg: getRadarSvg(), background: 'white' }),
    },
    {
      title: 'JSON',
      onclick: () => orbit.execute(clipJson, undefined),
    },
  ];
</script>

<div class={cn('flex justify-end gap-2 flex-col md:flex-row', clazz)}>
  <Popover.Root>
    <Popover.Trigger>
      <IconButton icon={ArrowDown} />
    </Popover.Trigger>
    <Popover.Content class="flex space-x-2 items-center justify-center w-auto">
      {#each actions as action}
        <Button
          variant={'outline'}
          size={'sm'}
          class="hover:ring-1 ring-black inset-2"
          download={() => action.onclick()}>{action.title}</Button
        >
      {/each}
    </Popover.Content>
  </Popover.Root>

  <!-- {#each actions as action}
    <ButtonDownload
      title={action.title}
      class={action.class}
      download={() => action.onclick()}
    />
  {/each} -->
</div>
