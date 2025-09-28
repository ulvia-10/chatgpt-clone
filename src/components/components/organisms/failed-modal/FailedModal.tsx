import {FailedIcon} from '@/components/atoms/icons'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface FailedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  failedGreeting?: string
  failedMessage?: string | Record<string, string[]>
  labelConfirmButton?: string
}

export default function FailedModal({
  open,
  onOpenChange,
  title,
  failedGreeting,
  failedMessage,
  labelConfirmButton = 'OK',
}: FailedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center my-4">
          <FailedIcon width={100} height={100} />
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-1">{failedGreeting}</p>

          {typeof failedMessage === 'string' ? (
            <p>{failedMessage}</p>
          ) : (
            <div className="text-center list-disc list-inside space-y-1 mt-2">
              {failedMessage &&
                Object.entries(failedMessage).map(([key, messages]) =>
                  messages.map((msg, index) => (
                    <span key={`${key}-${index}`}>{msg}</span>
                  )),
                )}
            </div>
          )}
        </div>

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
