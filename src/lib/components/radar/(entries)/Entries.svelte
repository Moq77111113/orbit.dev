<script lang="ts">
  import { useRadar } from '../context.svelte.js';
  import { columns } from './columns.js';
  import DataTable from './data-table.svelte';

  const radar = useRadar();
</script>

<DataTable
  {columns}
  data={radar.enrichedRadar.map((_) => ({
    entry: _.name,
    ring: _.ring.name,
    section: _.section.name,
  }))}
/>
