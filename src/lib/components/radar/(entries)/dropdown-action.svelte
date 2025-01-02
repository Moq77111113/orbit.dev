<script lang="ts">
  import Trash from 'lucide-svelte/icons/trash';
  import { Button } from '../../ui/button/index.js';

  let { onRemove }: { onRemove: () => void } = $props();
</script>

<Button onclick={() => onRemove()} variant="destructive" size="icon"
  ><Trash />
</Button>
