import {ScrollArea} from '@/components/ui/scroll-area'
import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar'
import type {PropsWithChildren} from 'react'
import {LayoutSidebar} from './layout-sidebar'

export const Layout = ({children}: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col pt-[--navbar-height,0]">
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider className="fixed h-[93%]">
          <LayoutSidebar />
          <SidebarInset className="flex-1">
            <ScrollArea>
              <main className="flex flex-1 flex-col gap-4 p-4 mb-[55px]">
                {children}
              </main>
            </ScrollArea>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
