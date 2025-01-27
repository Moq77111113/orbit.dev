<script lang="ts">
  import { cn } from '$lib/utils/ui.js';

  import { slide } from 'svelte/transition';
  import ToolbarClose from './toolbar-close.svelte';
  import ToolbarPrev from './toolbar-prev.svelte';
  import { useToolbar } from './toolbar.svelte.js';

  type Props = {
    class?: string;
  };

  const { class: clazz }: Props = $props();

  const toolbar = useToolbar();
</script>

{#if toolbar.island}
  <div
    transition:slide={{ axis: 'y', duration: 200 }}
    class={cn(
      'min-h-[200px] max-h-[calc(100dvh-200px)] bg-background overflow-x-hidden overflow-y-auto w-full rounded-lg border p-2 my-4 ',
      clazz
    )}
  >
    {#if toolbar.current}
      <div
        class="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background shadow-inner border-b flex justify-between items-center p-2"
      >
        {#if toolbar.hasPrev}
          <ToolbarPrev class="mr-auto" />
        {/if}
        {#if typeof toolbar.current.title === 'string'}
          {toolbar.current.title}
        {:else if typeof toolbar.current.title === 'function'}
          {@render toolbar.current.title()}
        {/if}
        <ToolbarClose class="ml-auto" />
      </div>

      {#key toolbar.current}
        <div transition:slide|local={{ axis: 'x' }} class="py-2">
          <toolbar.current.content />
        </div>
      {/key}
    {/if}
  </div>
{/if}
