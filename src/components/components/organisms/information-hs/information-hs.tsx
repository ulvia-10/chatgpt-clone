import {Skeleton} from '@/components/ui/skeleton'
import type {DetailItem} from '@/routes/_protected/health-score/$detail/_components/information'

interface InformationProps {
  details: DetailItem[]
}

export default function InformationHealthScore({details}: InformationProps) {
  return (
    <div className="grid grid-cols-4 gap-y-8 gap-x-4">
      {details.map((item, index) => {
        return (
          <div key={index}>
            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
            <p className="text-md font-bold">
              {item.value !== undefined && item.value !== null ? (
                item.value
              ) : (
                <Skeleton className="h-4 w-40" />
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}
