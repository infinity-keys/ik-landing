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
          className="mr-6 p-2 text-stone-50 transition-colors hover:text-brand-accent-secondary"
        >
          <ArrowRightIcon className="h-7 w-7 fill-transparent" />
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
            className="ml-6 p-2 text-stone-50 transition-colors hover:text-brand-accent-secondary"
          >
            <ArrowLeftIcon className="h-7 w-7 fill-transparent" />
          </button>
        )
      }}
      defaultControlsConfig={{
        pagingDotsClassName: 'mx-1 p-2 hover:text-brand-accent-primary',
        containerClassName: 'relative -bottom-12',
      }}
      className="w-full"
      style={{ height: '100%' }}
    >
      {children}
    </Carousel>
  )
}

export default MarkdownCarousel
