<script lang="ts">
  import * as Collapsible from '$lib/components/ui/collapsible/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import type { Icon } from 'lucide-svelte/icons';
  import type { Snippet } from 'svelte';

  type Props = {
    icon: typeof Icon;
    title: string;
    children: Snippet;
    open?: boolean;
  };

  const { icon, title, children, open = true }: Props = $props();
</script>

<Collapsible.Root {open}>
  <Collapsible.Trigger class="w-full">
    <Sidebar.GroupLabel
      class="flex flex-row-reverse w-full cursor-pointer items-center justify-between py-2"
    >
      {title}
      {@const I = icon}
      <I class="w-6 h-6" />
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
