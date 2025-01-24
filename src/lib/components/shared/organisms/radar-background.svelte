<script lang="ts">
  import Label from '$lib/components/ui/label/label.svelte';
  import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
  import { useSvgBackground } from '$lib/hooks/svg-background.svelte.js';
  import { Icons } from '$lib/icons/index.js';
  import { cn } from '$lib/utils/ui.js';

  const background = useSvgBackground();
  // 8 colors for a tech radar background (it contains already green, red, orange, and blue) 4 for light, 4 for dark. use pastels colors
  const presets = [
    'transparent',
    'white',
    '#E6F2FF',
    '#FFF0E6',
    '#E6FFED',
    '#FFF5E6',
    '#EDE9FE',
    '#FCE7F3',
    '#E0F2FE',
    '#FAE8FF',
  ];
</script>

<div class="flex flex-col space-y-2">
  <Label class="whitespace-nowrap">Svg Background</Label>

  <ToggleGroup.Root
    type="single"
    value={background.value}
    onValueChange={(v) => background.change(v)}
    class="ring-ring shrink-0 items-center rounded-md text-sm font-medium outline-none 
           grid grid-cols-5 
           focus-visible:ring-2"
  >
    {#each presets as value}
      <ToggleGroup.Item
        {value}
        aria-label={value}
        class={cn(
          'h-8 px-0',
          '[&_svg]:size-6 [&_div]:size-6 [&_div]:border',
          '[&_div]:border-border [&_svg]:border [&_svg]:border-border',
          background.value === value ? 'ring-1' : ''
        )}
      >
        {#if value === 'transparent'}
          <Icons.transparent />
        {:else}
          <div style="--bg: {value}" class=" bg-[--bg]"></div>
        {/if}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
</div>
