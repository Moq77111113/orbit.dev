<script lang="ts">
  import { useRadar } from '../context.svelte.js';
  import { columns } from './columns.js';
  import DataTable from './data-table.svelte';

  const radar = useRadar();

  let cols = $state(columns(radar.sections, radar.rings));

  let data = $state(
    radar.enrichedRadar.map((_) => ({
      entry: _,
      ring: _.ring,
      section: _.section,
    }))
  );

  $effect(() => {
    cols = columns(radar.sections, radar.rings);
    data = radar.enrichedRadar.map((_) => ({
      entry: _,
      ring: _.ring,
      section: _.section,
    }));
  });
</script>
<DataTable columns={cols} {data} />
