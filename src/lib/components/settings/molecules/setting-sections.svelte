<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class={'flex flex-col gap-4 py-2 pl-2 '}>
  {@render children()}
</div>
