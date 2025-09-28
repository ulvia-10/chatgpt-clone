import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import type {ComponentProps, FC} from 'react'

interface Items {
  title: string
  icon: FC<ComponentProps<'svg'>>
  items?: Items[]
}

type LayoutSidebarFootProps = {
  items: Items[]
}

export const LayoutSidebarFoot = ({items}: LayoutSidebarFootProps) => {
  const {open} = useSidebar()
  const data = items[0]

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 p-2 cursor-default">
            <data.icon />
            {open && <span> {data.title}</span>}
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
