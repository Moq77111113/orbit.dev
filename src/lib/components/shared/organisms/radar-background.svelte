<script lang="ts">
  import Label from '$lib/components/ui/label/label.svelte';
  import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
  import { useSvgBackground } from '$lib/hooks/svg-background.svelte.js';
  import { cn } from '$lib/utils/ui.js';

  const background = useSvgBackground();
  // 8 colors for a tech radar background (it contains already green, red, orange, and blue) 4 for light, 4 for dark. use pastels colors
  const presets = [
    'transparent',
    'white',
    // Light pastel backgrounds
    '#E6F2FF', // Soft blue
    '#FFF0E6', // Light peach
    '#E6FFED', // Mint green
    '#FFF5E6', // Light orange

    // Dark pastel backgrounds
    '#1E3A8A', // Deep blue
    '#7C2D12', // Muted rust
    '#14532D', // Dark forest green
    '#78350F', // Deep terracotta
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
           focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
  >
    {#each presets as value}
      <ToggleGroup.Item
        {value}
        aria-label={value}
        class={cn('h-8 px-0', background.value === value ? 'ring-1' : '')}
      >
        {#if value === 'transparent'}
          <svg class="">
            <defs>
              <pattern
                id="transparent-bg"
                patternUnits="userSpaceOnUse"
                width="8"
                height="8"
              >
                <path
                  d="M0 0 L8 8 M8 0 L0 8"
                  stroke="lightgray"
                  stroke-width="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#transparent-bg)" />
            <rect
              width="100%"
              height="100%"
              fill="transparent"
              stroke="gray"
              stroke-dasharray="3,3"
            />
          </svg>
        {:else}
          <div
            style="--bg: {value}"
            class="size-6 bg-[--bg] border-black border-1"
          ></div>
        {/if}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
</div>
