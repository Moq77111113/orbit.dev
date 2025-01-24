<script lang="ts">
  import Menu from '$lib/components/menu/organisms/menu.svelte';

  import RadarView from './radar-view.svelte';

  let svg: SVGElement = $state<SVGElement>({} as SVGElement);
</script>

<Menu />
<div class="relative w-full flex flex-1 items-center justify-center">
  <RadarView bind:svg />
</div>
