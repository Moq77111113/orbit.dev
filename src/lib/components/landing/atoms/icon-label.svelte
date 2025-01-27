<script lang="ts">
  import type { Icon } from 'lucide-svelte';

  type Props = {
    icon: typeof Icon;
    label: string;
  };

  const { icon: I, label }: Props = $props();
</script>

<div class="flex items-center gap-2 text-lg">
  <I class="size-6 text-primary" />
  <span>{label}</span>
</div>
