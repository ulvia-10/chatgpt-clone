import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export function SelectShow() {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Show</p>
      <Select value={'50'}>
        <SelectTrigger className="h-8 w-[65px]">
          <SelectValue placeholder={10} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map(pageSize => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm font-medium">Entries</p>
    </div>
  )
}
