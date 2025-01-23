<script lang="ts">
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { cn } from '$lib/utils/ui.js';

  import type { Component } from 'svelte';

  type Section<T extends Record<string, unknown> = Record<string, unknown>> = {
    component: Component<T>;
    props: T;
  };

  type Props = {
    // biome-ignore lint/suspicious/noExplicitAny: Its the role of the consuming component to define the type of the sections
    sections: Section<any>[];
  };

  const { sections }: Props = $props();
</script>

{#each sections as section, i}
  <div class={cn('flex flex-col gap-4 py-2 pl-2')}>
    <section.component {...section.props} />

    {#if i < sections.length - 1}
      <Separator />
    {/if}
  </div>
{/each}
