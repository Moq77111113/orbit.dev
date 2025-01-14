<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import type { Snippet } from 'svelte';
  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<Form.Label>{@render children()}</Form.Label>
