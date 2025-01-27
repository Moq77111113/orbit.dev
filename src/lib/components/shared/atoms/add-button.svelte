<script lang="ts" generics="T">
  import Plus from 'lucide-svelte/icons/plus';
  import Button from '../../ui/button/button.svelte';

  type Props = {
    onclick: () => void;
  };

  const { onclick }: Props = $props();
</script>

<Button
  size="icon"
  variant="ghost"
  class="hover:bg-inherit hover:scale-110"
  {onclick}><Plus class="size-4" /></Button
>
