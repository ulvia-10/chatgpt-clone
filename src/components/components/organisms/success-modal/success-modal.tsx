import {SuccessIcon} from '@/components/atoms/icons'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  successGreeting?: string
  successMessage?: string
  labelConfirmButton?: string
}

export default function SuccessModal({
  open,
  onOpenChange,
  title,
  successGreeting,
  successMessage,
  labelConfirmButton = 'OK',
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center my-4">
          <SuccessIcon width={100} height={100} />
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="block font-medium">{successGreeting}</span>
          <span>{successMessage}</span>
        </p>
        <DialogFooter className="mt-4">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full bg-primary py-2 rounded-md font-semibold hover:bg-primary/90"
          >
            {labelConfirmButton}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
