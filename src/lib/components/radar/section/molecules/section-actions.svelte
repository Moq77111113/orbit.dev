<script lang="ts">
  import type { Section } from '$lib/radar/core/elements/types.js';

  import MenuActions, {
    type MenuActionHandler,
  } from '$lib/components/menu/molecules/menu-actions.svelte';

  import Pencil from 'lucide-svelte/icons/pencil';
  import Trash from 'lucide-svelte/icons/trash';

  type Actions = {
    onEdit(section: Section): void;
    onRemove(section: Section): void;
  };
  type Props = {
    section: Section;
    actions: Actions;
  };

  const { section, actions: handlers }: Props = $props();

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
  ] satisfies MenuActionHandler<Section>[];
</script>

<MenuActions {actions} item={section} />
