<script lang="ts">
  import { useRadar } from '../context.svelte.js';
  import { columns } from './columns.js';
  import DataTable from './data-table.svelte';

  const radar = useRadar();

  const cols = $derived.by(() => columns(radar.sections, radar.rings));
</script>

<DataTable
  columns={cols}
  data={radar.enrichedRadar.map((_) => ({
    entry: _.name,
    ring: _.ring.name,
    section: _.section.name,
  }))}
/>
