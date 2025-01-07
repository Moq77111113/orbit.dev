<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { cn } from '$lib/utils/ui.js';
  import type { Icon } from 'lucide-svelte';
  import type { Snippet } from 'svelte';

  type WithSnippet = {
    children: Snippet;
  };

  type Basic = {
    title: string;
    onclick?: () => void;
  };

  type Props = {
    icon?: typeof Icon;
    class?: string;
  } & (Basic | WithSnippet);
  const { icon, class: clazz, ...restProps }: Props = $props();
</script>

{#if 'children' in restProps}
  <DropdownMenu.Item class={clazz}>
    {@render restProps.children()}
  </DropdownMenu.Item>
{:else}
  <DropdownMenu.Item
    onclick={restProps.onclick}
    class={cn(restProps.onclick ? 'cursor-pointer' : '', clazz)}
    disabled={!restProps.onclick}
  >
    {restProps.title}
    {#if icon}
      <DropdownMenu.Shortcut>
        {@const I = icon}
        <I class="size-4" />
      </DropdownMenu.Shortcut>
    {/if}
  </DropdownMenu.Item>
{/if}
