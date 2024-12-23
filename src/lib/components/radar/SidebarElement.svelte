<script lang="ts">
  import * as Collapsible from '$lib/components/ui/collapsible/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import type { Icon } from 'lucide-svelte/icons/index.js';
  import type { Snippet } from 'svelte';

  type Props = {
    icon: Icon;
    title: string;
    children: Snippet;
  };

  const { icon, title, children }: Props = $props();

  let open = $state(false);
</script>

<Collapsible.Root>
  <Collapsible.Trigger class="w-full">
    <Sidebar.GroupLabel
      class="flex w-full cursor-pointer items-center justify-between py-2"
    >
      {title}
      <svelte:component this={icon} class="h-4 w-4" />
    </Sidebar.GroupLabel>
  </Collapsible.Trigger>

  <Collapsible.Content>
    <Sidebar.GroupContent>
      <Sidebar.Menu>{@render children()}</Sidebar.Menu>
    </Sidebar.GroupContent>

    <!-- <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Radar Size</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Color Scheme</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Font Settings</SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent> -->
  </Collapsible.Content>
</Collapsible.Root>
