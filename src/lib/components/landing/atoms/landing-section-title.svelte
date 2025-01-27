<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<h2 class="text-3xl font-bold text-primary mb-6">{@render children()}</h2>
