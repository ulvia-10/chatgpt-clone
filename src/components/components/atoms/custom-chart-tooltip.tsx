export const CustomChartTooltip = ({
  active,
  payload,
  title,
  selectTooltip,
  customKey,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: any) => {
  if (!active || !payload?.length) {
    return null
  }

  const hoveredBar =
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    payload.find((entry: any) => {
      return entry.name === selectTooltip
    }) || payload[0]

  if (!hoveredBar) {
    return null
  }

  return (
    <div className="backdrop-blur-sm bg-white/10 rounded-md p-2 shadow-md border border-white/20 flex flex-col items-center justify-center relative px-4">
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden backdrop-blur-sm rotate-180">
        <div
          className="w-4 h-4 rounded-full backdrop-blur-sm bg-white/10 border border-white/20"
          style={{transform: 'translateY(-50%)'}}
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold">
          {customKey ? hoveredBar.payload[customKey] : hoveredBar.value}
        </p>
      </div>
      <p className="text-xs font-light">{title}</p>
    </div>
  )
}
