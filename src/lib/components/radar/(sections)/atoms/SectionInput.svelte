<script lang="ts">
  import Input from '~/lib/components/ui/input/input.svelte';
  import type { Section } from '~/types/radar.js';

  type Props = Pick<Section, 'name' | 'color'> & { edit?: boolean };

  let { name, color, edit = false }: Props = $props();
</script>

{#if edit}
  <Input bind:value={name} class="w-full" />
{:else}
  <span class="ml-2 text-sm font-medium text-gray-900">{name}</span>
{/if}
