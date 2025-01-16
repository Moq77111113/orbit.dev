<script lang="ts">
  import MenuActions, {
    type MenuActionHandler,
  } from '$lib/components/menu/molecules/menu-actions.svelte';

  import type { Ring } from '$lib/radar/core/elements/types.js';

  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import ArrowUp from 'lucide-svelte/icons/arrow-up';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Trash from 'lucide-svelte/icons/trash';

  type Actions = {
    onEdit(ring: Ring): void;
    onRemove(ring: Ring): void;
    onMove(ring: Ring, direction: 'up' | 'down'): void;
  };
  type Props = {
    ring: Ring;
    actions: Actions;
  };

  const { ring, actions: handlers }: Props = $props();

  const actions = [
    {
      icon: Pencil,
      title: 'Edit',
      handle: handlers.onEdit,
    },
    {
      icon: Trash,
      title: 'Remove',
      handle: handlers.onRemove,
    },
    {
      icon: ArrowUp,
      title: 'Move up',
      handle: (ring: Ring) => handlers.onMove(ring, 'up'),
    },

    {
      icon: ArrowDown,
      title: 'Move down',
      handle: (ring: Ring) => handlers.onMove(ring, 'down'),
    },
  ] satisfies MenuActionHandler<Ring>[];
</script>

<MenuActions {actions} item={ring} />
