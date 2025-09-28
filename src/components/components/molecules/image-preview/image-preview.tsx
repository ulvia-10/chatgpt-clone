import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type React from 'react'

export interface ImagePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageSrc: string
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({
  open,
  onOpenChange,
  imageSrc,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden">
        <DialogHeader className="flex justify-center items-center relative px-6 pt-4 pb-2">
          <DialogTitle className="text-center w-full">Unit Image</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <img
            src={imageSrc}
            alt="Uploaded"
            className="w-full h-auto rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImagePreviewDialog
