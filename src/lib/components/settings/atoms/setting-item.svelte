<script lang="ts" module>
  import type { ButtonProps } from '$lib/components/ui/button/button.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { cn } from '$lib/utils/ui.js';
  import type { Icon } from 'lucide-svelte';
  import type { Component } from 'svelte';

  export type NavElement = Omit<ButtonProps, 'children'> & {
    title: string;
    icon?: typeof Icon | Component;
    label?: string;
  };
</script>

<script lang="ts">
  type Props = {
    navElement: NavElement;
    class?: string;
  };

  const { navElement, class: clazz }: Props = $props();
</script>

<Button
  size="sm"
  class={cn(
    'justify-start flex select-none items-center gap-2 h-auto rounded-sm py-1.5 px-2 text-sm outline-none',
    clazz
  )}
  {...navElement}
  variant="ghost"
>
  {#if navElement.icon}
    {@const I = navElement.icon}
    <I />
  {/if}
  {navElement.title}
  {#if navElement.label}
    <span class={cn('ml-auto tracking-widest opacity-60')}>
      {navElement.label}
    </span>
  {/if}
</Button>
