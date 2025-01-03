<script lang="ts">
  import { useRadar } from '../context.svelte.js';
  import { columns } from './columns.js';
  import DataTable from './(components)/data-table.svelte';

  const radar = useRadar();

  let cols = $state(columns(radar.sections, radar.rings));

  let data = $state(radar.enrichedRadar);

  $effect(() => {
    cols = columns(radar.sections, radar.rings);
    data = radar.enrichedRadar;
  });
</script>

<DataTable columns={cols} bind:data />
