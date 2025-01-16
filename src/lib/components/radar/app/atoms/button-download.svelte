<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Snippet } from 'svelte';

  type WithChildren<T> = T & { children: Snippet; title?: undefined };
  type WithTitle<T> = T & { title: string; children?: undefined };
  type Base = {
    class?: string;
    download: () => Promise<void> | void;
  };

  type Props = WithTitle<Base> | WithChildren<Base>;

  const props: Props = $props();
  const { class: clazz, download, children, title } = props;
</script>

<Button onclick={download} class={clazz}>
  {#if title}
    {title}
  {/if}
  {#if children}
    {@render children()}
  {/if}
</Button>
