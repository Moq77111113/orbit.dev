<script lang="ts">
  import Button, {
    type ButtonProps,
  } from '$lib/components/ui/button/button.svelte';
  import type { Icon } from 'lucide-svelte';

  type Props = {
    icon: typeof Icon;
  } & Omit<ButtonProps, 'variant' | 'size'>;

  let { icon: I, onclick, ...rest }: Props = $props();
</script>

<Button size="icon" variant={'outline'} {onclick} {...rest}>
  <I />
</Button>
