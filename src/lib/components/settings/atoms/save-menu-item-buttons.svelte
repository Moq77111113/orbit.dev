<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { Icons } from "$lib/icons/index.js";

  type ExportProps = {
    onDownload: () => void;
    onCopy?: () => void;
  };

  let { onDownload, onCopy }: ExportProps = $props();
</script>

<Button size="icon" onclick={() => onDownload()} title="Download">
  <Icons.download />
  <span class="sr-only">Download</span>
</Button>

{#if onCopy}
  <Button size="icon" variant="outline" onclick={() => onCopy()} title="Copy">
    <Icons.copy />
    <span class="sr-only">Copy</span>
  </Button>
{/if}
