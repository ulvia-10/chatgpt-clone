import {CloseIcon} from '@/components/atoms/icons'
import {Button} from '@/components/ui/button'
import {Skeleton} from '@/components/ui/skeleton'
import type {ItemProps} from '@/routes/_protected/lubricant-analysis/detail/_components/follow-up'
import type React from 'react'
import {useEffect, useMemo, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import ImagePreviewDialog from '../image-preview/image-preview'

type CardImageProps = {
  currentIndex: number
  loading: boolean
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>
}

const CardImage = ({currentIndex, loading, setItems}: CardImageProps) => {
  const form = useFormContext()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const imageUnit = form.watch('imageUnit')

  const imageSrc = useMemo(() => {
    if (!imageUnit) {
      return
    }
    try {
      return URL.createObjectURL(imageUnit)
    } catch {
      return
    }
  }, [imageUnit])

  useEffect(() => {
    if (imageUnit) {
      return () => URL.revokeObjectURL(imageUnit)
    }
  }, [imageUnit])

  const handleImageClick = () => {
    if (imageSrc) {
      setIsPreviewOpen(true)
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const updateEntityItems = (index: number, name: string, value: any) => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? {...item, [name]: value} : item,
      ),
    )
  }

  const handleImageRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateEntityItems(currentIndex, 'imageUnit', null)
    form.setValue('imageUnit', null)
  }

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="relative w-[100px] h-[80px] flex items-center justify-center rounded bg-[#F1F1F1] cursor-pointer"
        onClick={handleImageClick}
      >
        {loading ? (
          <Skeleton className="w-[100px] h-[80px]" />
        ) : (
          imageSrc && (
            <img
              loading="lazy"
              src={imageSrc}
              alt="Uploaded"
              className="h-full w-full object-cover rounded"
            />
          )
        )}

        {!loading && (
          <Button
            size="icon"
            className="absolute -top-5 -right-5 bg-transparent hover:bg-transparent z-[999]"
            onClick={handleImageRemove}
          >
            <CloseIcon fill="#E9445A" width={20} height={20} />
          </Button>
        )}
      </div>

      {/* 👇 This renders the ShadCN dialog */}
      {imageSrc && (
        <ImagePreviewDialog
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          imageSrc={imageSrc}
        />
      )}
    </>
  )
}

export default CardImage
