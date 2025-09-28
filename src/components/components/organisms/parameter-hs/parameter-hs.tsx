import {Skeleton} from '@/components/ui/skeleton'
import {cn} from '@/lib/utils'
import type {
  AvgScore,
  DetailItem,
} from '@/routes/_protected/health-score/$detail/_components/information'

interface ParameterHealthScoreProps {
  componentScore: DetailItem[]
  healthScore: AvgScore
  parameter: string
}

export default function ParameterHealthScore({
  componentScore,
  healthScore,
  parameter,
}: ParameterHealthScoreProps) {
  const getColor = (status: string) => {
    if (status === 'NORMAL') {
      return 'bg-green-gradient text-background'
    } else if (status === 'ATTENTION') {
      return 'bg-yellow-gradient text-foreground'
    } else if (status === 'CRITICAL') {
      return 'bg-red-gradient text-background'
    } else {
      return ''
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-2 w-full h-[8.5rem]',
        componentScore.length > 5 && 'bg-[#F2F2F2] p-2 rounded-md',
      )}
    >
      <div
        className="flex flex-col gap-1 flex-1 min-w-0 overflow-y-auto pr-2
                [&::-webkit-scrollbar]:w-[10px]
                [&::-webkit-scrollbar-thumb]:bg-[#FFFFFF]
                [&::-webkit-scrollbar-track]:bg-[#D3D3D3]
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:shadow-[inset_0_0_0_2px_#D3D3D3]"
      >
        {componentScore.length === 0 ? (
          <Skeleton className="h-full w-full" />
        ) : (
          componentScore.map((score, index) => (
            <div
              key={index}
              className={cn(
                'flex justify-between items-center px-4 py-[4px] font-medium w-full rounded-lg h-min-6 leading-4 gap-2',
                getColor(score.status as string),
              )}
            >
              <span>{score.label}</span>
              <span>{score.value}%</span>
            </div>
          ))
        )}
      </div>

      <div
        className={cn(
          'flex flex-col items-center justify-center font-bold rounded-md flex-none w-full md:w-1/3 p-2',
          getColor(healthScore?.status),
        )}
      >
        {healthScore ? (
          <>
            <div className="text-4xl">{healthScore?.score}%</div>
            <div className="text-md mt-3 text-center">
              <div className="leading-[20px]">
                {parameter}
                <br />
                Health Score
              </div>
            </div>
          </>
        ) : (
          <Skeleton className="h-20 w-20" />
        )}
      </div>
    </div>
  )
}
