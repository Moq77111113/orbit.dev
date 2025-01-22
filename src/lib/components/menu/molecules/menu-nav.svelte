<script lang="ts">
  import type { ButtonProps } from '$lib/components/ui/button/button.svelte';
  import type { Icon } from 'lucide-svelte';

  export type MenuElementLink = Omit<ButtonProps, 'children'> & {
    title: string;
    icon?: typeof Icon;
    label?: string;
  };
  import Button from '$lib/components/ui/button/button.svelte';
  import { cn } from '$lib/utils/ui.js';

  type Props = {
    links: MenuElementLink[];
    class?: string;
  };

  const { links, class: clazz }: Props = $props();
</script>

<div class={cn('group flex flex-col gap-4 py-2', clazz)}>
  <nav class="grid gap-1 px-2">
    {#each links as link (link.title)}
      <Button
        href="#"
        size="sm"
        class={cn(
          'justify-start  flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none '
        )}
        {...link}
        variant="ghost"
      >
        {#if link.icon}
          {@const I = link.icon}
          <I class="ml-2" />
        {/if}
        {link.title}
        {#if link.label}
          <span class={cn('ml-auto')}>
            {link.label}
          </span>
        {/if}
      </Button>
    {/each}
  </nav>
</div>
