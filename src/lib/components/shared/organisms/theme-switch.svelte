<script lang="ts">
  import Label from '$lib/components/ui/label/label.svelte';
  import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
  import { type ThemeValue, useTheme } from '$lib/hooks/theme.svelte.js';
  import { Icons } from '$lib/icons/index.js';

  const theme = useTheme();

  function icon(value: ThemeValue) {
    return {
      light: Icons.themelight,
      dark: Icons.themedark,
      system: Icons.themesys,
    }[value];
  }
</script>

<div class="flex justify-between items-center ring-ring">
  <Label>Theme</Label>

  <ToggleGroup.Root
    type="single"
    value={theme.value}
    onValueChange={(v) => theme.change(v as ThemeValue)}
    class="ring-ring  shrink-0 items-center rounded-md px-2 text-sm font-medium outline-none focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
  >
    {#each theme.values as value}
      <ToggleGroup.Item {value} aria-label={value}>
        {@const Icon = icon(value)}<Icon />
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
</div>
