<script lang="ts">
  import { cn } from '$lib/utils/ui.js';

  import type { Snippet } from 'svelte';
  import { buttonVariants } from '../ui/button/index.js';

  type Props = {
    href: string;
    children: Snippet;
    label: string;
  };

  const { href, children, label }: Props = $props();
</script>

<a {href} target="_blank" rel="noopener noreferrer">
  <div
    class={cn(buttonVariants({ size: 'sm', variant: 'ghost' }), 'h-8 w-8 px-0')}
  >
    {@render children()}
    <span class="sr-only">{label}</span>
  </div>
</a>
