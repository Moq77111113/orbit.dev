<script lang="ts" generics="T extends string">
  import ToggleButton from '$lib/components/shared/atoms/toggle-button.svelte';
  import { cn } from '$lib/utils/ui.js';

  type Props = {
    items: T[];
    selected: T;
    onToggle: (item: T) => void;
  };

  const { items, selected, onToggle }: Props = $props();
</script>

<div class={cn('grid grid-cols-2 gap-2')}>
  {#each items as item}
    <ToggleButton
      selected={item === selected}
      onclick={() => onToggle(item)}
      class="w-full">{item}</ToggleButton
    >
  {/each}
</div>
