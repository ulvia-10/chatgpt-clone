import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {Link} from '@tanstack/react-router'
import React from 'react'

interface BreadcrumbItemProps {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  listBreadcrumbs: Array<BreadcrumbItemProps>
}

export function BreadcrumbWithCustomSeparator({
  listBreadcrumbs,
}: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {listBreadcrumbs.map((breadcrumb, index) => {
          const {label, to} = breadcrumb
          const isLast = index === listBreadcrumbs.length - 1
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {to ? (
                  <BreadcrumbLink>
                    <Link to={to}>{label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-[#3275EF] font-bold">
                    {label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
