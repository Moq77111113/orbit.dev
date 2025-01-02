<script lang="ts">
  import { columns } from '~/lib/components/radar/(entries)/columns.js';
  import DataTable from '~/lib/components/radar/(entries)/data-table.svelte';
  import { useRadar } from '~/lib/components/radar/context.svelte.js';

  const radar = useRadar();

  const cols = $derived.by(() => columns(radar.sections, radar.rings));
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
  <div class="flex items-center justify-between space-y-2">
    <DataTable
      columns={cols}
      data={radar.enrichedRadar.map((_) => ({
        id: _.name,
        entry: _.name,
        ring: _.ring.name,
        section: _.section.name,
      }))}
    />
  </div>
</div>
