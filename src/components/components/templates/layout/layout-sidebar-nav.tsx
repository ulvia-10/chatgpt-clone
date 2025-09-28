import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {cn} from '@/lib/utils'
import {Link, useLocation} from '@tanstack/react-router'
import {ChevronDown} from 'lucide-react'
import type {ComponentProps, FC} from 'react'

interface Items {
  title: string
  url: string
  icon: FC<ComponentProps<'svg'>>
  isActive?: boolean
  items?: Items[]
}

type LayoutSidebarNavProps = {
  items: Items[]
}

export const LayoutSidebarNav = ({items}: LayoutSidebarNavProps) => {
  const location = useLocation()
  const {open} = useSidebar()

  const isAnySubItemActive = (item: Items): boolean => {
    return (
      item.items?.some(
        subItem =>
          location.pathname.includes(subItem.url) ||
          isAnySubItemActive(subItem),
      ) || false
    )
  }

  return (
    <SidebarGroup className="p-0 overflow-x-hidden">
      <SidebarMenu>
        {items.map(item => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isAnySubItemActive(item)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    'rounded-none px-4 h-10',
                    isAnySubItemActive(item) && 'bg-[#EFEFEF]',
                    !open &&
                      'flex items-center justify-center group-data-[collapsible=icon]:!w-full',
                  )}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span className={cn('font-bold', !open && 'hidden')}>
                    {item.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180',
                      !open && 'hidden',
                    )}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="mx-0 px-0 border-none">
                  {item.items?.map(subItem => {
                    if (subItem.items) {
                      return (
                        <Collapsible
                          key={subItem.title}
                          asChild
                          defaultOpen={isAnySubItemActive(subItem)}
                          className="group/subCollapsible"
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                className={cn(
                                  'rounded-none pl-8 h-10',
                                  location.pathname.includes(subItem.url) &&
                                    'bg-primary',
                                )}
                                tooltip={subItem.title}
                              >
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/subCollapsible:rotate-180" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub className="mx-0 px-0 border-none">
                                {subItem.items?.map(otherSubItem => {
                                  if (
                                    otherSubItem.items &&
                                    otherSubItem.items.length > 0
                                  ) {
                                    return (
                                      <Collapsible
                                        key={otherSubItem.title}
                                        asChild
                                        defaultOpen={isAnySubItemActive(
                                          otherSubItem,
                                        )}
                                        className="group/otherSubCollapsible"
                                      >
                                        <SidebarMenuSubItem>
                                          <CollapsibleTrigger asChild>
                                            <SidebarMenuSubButton
                                              className={cn(
                                                'rounded-none pl-14 h-10',
                                                location.pathname.includes(
                                                  otherSubItem.url,
                                                ) && 'bg-primary/40',
                                              )}
                                              // tooltip={otherSubItem.title}
                                            >
                                              {otherSubItem.icon && (
                                                <otherSubItem.icon />
                                              )}
                                              <span>{otherSubItem.title}</span>
                                              <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/otherSubCollapsible:rotate-180" />
                                            </SidebarMenuSubButton>
                                          </CollapsibleTrigger>
                                          <CollapsibleContent>
                                            <SidebarMenuSub className="mx-0 px-0 border-none">
                                              {otherSubItem.items.map(
                                                finalItem => (
                                                  <SidebarMenuSubItem
                                                    key={finalItem.title}
                                                  >
                                                    <SidebarMenuSubButton
                                                      className={cn(
                                                        'rounded-none pl-20 h-10',
                                                        location.pathname.includes(
                                                          finalItem.url,
                                                        ) && 'bg-primary/20',
                                                      )}
                                                      asChild
                                                    >
                                                      <Link to={finalItem.url}>
                                                        {finalItem.icon && (
                                                          <finalItem.icon />
                                                        )}
                                                        <span>
                                                          {finalItem.title}
                                                        </span>
                                                      </Link>
                                                    </SidebarMenuSubButton>
                                                  </SidebarMenuSubItem>
                                                ),
                                              )}
                                            </SidebarMenuSub>
                                          </CollapsibleContent>
                                        </SidebarMenuSubItem>
                                      </Collapsible>
                                    )
                                  }

                                  return (
                                    <SidebarMenuSubItem
                                      key={otherSubItem.title}
                                    >
                                      <SidebarMenuSubButton
                                        className={cn(
                                          'rounded-none pl-14 h-10',
                                          location.pathname.includes(
                                            otherSubItem.url,
                                          ) && 'bg-primary/40',
                                        )}
                                        asChild
                                      >
                                        <Link to={otherSubItem.url}>
                                          {otherSubItem.icon && (
                                            <otherSubItem.icon />
                                          )}
                                          <span>{otherSubItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  )
                                })}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      )
                    }

                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          className={cn(
                            'rounded-none pl-8 h-10',
                            location.pathname.includes(subItem.url) &&
                              'bg-primary',
                          )}
                          asChild
                        >
                          <Link to={subItem.url}>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
