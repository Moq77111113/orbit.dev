<script lang="ts">
  import type { Icon } from 'lucide-svelte';
  import IconLabel from '../atoms/icon-label.svelte';

  type Props = {
    icon: typeof Icon;
    label: string;
    description: string;
  };

  const { icon, label, description }: Props = $props();
</script>

<div
  class="w-full max-w-sm p-6 border rounded-lg hover:shadow-lg transition-all"
>
  <IconLabel {icon} {label} />
  <p class="text-muted-foreground mt-4">{description}</p>
</div>
