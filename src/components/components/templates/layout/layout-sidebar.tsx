'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import {cn} from '@/lib/utils'
import type * as React from 'react'
import AMMDashboard from '/assets/images/amm-logo.png'
import {SIDEBAR_MENU} from './layout-sidebar-data'
import {LayoutSidebarFoot} from './layout-sidebar-foot'
import {LayoutSidebarNav} from './layout-sidebar-nav'

export const LayoutSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const {open} = useSidebar()

  return (
    <Sidebar className="absolute" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu
          className={cn(
            'shadow px-2 py-2 rounded-lg flex items-center justify-between',
            !open && 'px-0 py-1',
          )}
        >
          <SidebarMenuItem className="flex items-center justify-between w-full">
            <img
              src={AMMDashboard}
              alt="Logo - AMM Dashboard"
              className={cn(!open && 'hidden')}
              width={160}
            />
            <SidebarTrigger
              className={cn(
                !open && 'ml-0 rotate-180 transition-all duration-300',
              )}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <LayoutSidebarNav items={SIDEBAR_MENU.navMain} />
      </SidebarContent>
      <SidebarFooter
        style={{
          marginBottom: 'var(--navbar-height, 55px)',
        }}
      >
        <LayoutSidebarFoot items={SIDEBAR_MENU.info} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
