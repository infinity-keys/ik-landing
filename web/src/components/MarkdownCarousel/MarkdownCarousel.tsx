import { PropsWithChildren } from 'react'

import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon'
import Carousel, { ControlProps } from 'nuka-carousel'

const MarkdownCarousel = ({
  children,
  showOverlay,
  setShowOverlay,
  setSlideIndex,
}: PropsWithChildren & {
  showOverlay: boolean
  setShowOverlay: (b: boolean) => void
  setSlideIndex: (n: number) => void
}) => {
  return (
    <Carousel
      dragging={false}
      renderCenterRightControls={null}
      renderCenterLeftControls={null}
      renderBottomRightControls={(props: ControlProps) => (
        <button
          onClick={() => {
            if (showOverlay) {
              setShowOverlay(false)
            }
            setSlideIndex(
              props.currentSlide + 1 === props.slideCount
                ? props.currentSlide
                : props.currentSlide + 1
            )
            props.nextSlide()
          }}
          className="mr-6 p-2 text-stone-50 transition-colors hover:text-stone-400"
        >
          <ArrowRightIcon className="h-8 w-8 fill-transparent" />
        </button>
      )}
      renderBottomLeftControls={(props: ControlProps) => {
        return (
          <button
            onClick={() => {
              if (showOverlay) {
                setShowOverlay(false)
              }
              setSlideIndex(props.currentSlide > 0 ? props.currentSlide - 1 : 0)
              props.previousSlide()
            }}
            className="ml-6 p-2 text-stone-50 transition-colors hover:text-stone-400"
          >
            <ArrowLeftIcon className="h-8 w-8 fill-transparent" />
          </button>
        )
      }}
      defaultControlsConfig={{
        pagingDotsClassName: 'mx-[2px] p-2',
        containerClassName: 'relative -bottom-16 ',
      }}
      className="w-full"
      style={{ height: '100%' }}
    >
      {children}
    </Carousel>
  )
}

export default MarkdownCarousel
