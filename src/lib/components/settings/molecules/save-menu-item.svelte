<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { Icon } from 'lucide-svelte';
  import SaveMenuItemButtons from '../atoms/save-menu-item-buttons.svelte';
  import SaveMenuItemDesc from '../atoms/save-menu-item-desc.svelte';
  import SaveMenuItemTitle from '../atoms/save-menu-item-title.svelte';

  export type SaveMenuItemProps = {
    svg: SVGElement;
    title: string;
    description?: string;
    icon: typeof Icon;
    export: (svg: SVGElement) => void;
    copy?: (svg: SVGElement) => void;
    class?: string;
  };

  let {
    svg,
    export: onclick,
    copy,
    title,
    description,
    icon: I,
    class: clazz,
  }: SaveMenuItemProps = $props();
</script>

<article class={cn('flex flex-col h-full pb-4', clazz)}>
  <header class="grid grid-rows-2 gap-2 h-32 place-items-center">
    <SaveMenuItemTitle {title} />

    <I class="size-8" />
    {#if description}
      <SaveMenuItemDesc {description} />
    {/if}
  </header>

  <footer class="mt-6 pt-4 flex justify-center gap-2">
    <SaveMenuItemButtons
      onDownload={() => onclick(svg)}
      onCopy={copy ? () => copy(svg) : undefined}
    />
  </footer>
</article>
