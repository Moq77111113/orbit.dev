<script lang="ts">
  import type { ButtonProps } from '$lib/components/ui/button/button.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  const props: ButtonProps = $props();
</script>

<Button size={'icon'} variant="ghost" {...props} />
