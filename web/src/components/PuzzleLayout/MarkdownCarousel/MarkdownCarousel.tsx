import { PropsWithChildren } from 'react'

import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon'
import clsx from 'clsx'
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
      renderBottomRightControls={(props: ControlProps) => {
        const isLastSlide = props.slideCount === props.currentSlide + 1
        return (
          <button
            onClick={() => {
              if (showOverlay) {
                setShowOverlay(false)
              }
              setSlideIndex(
                isLastSlide ? props.currentSlide : props.currentSlide + 1
              )
              props.nextSlide()
            }}
            disabled={isLastSlide}
            className={clsx(
              'mr-6 p-2 text-stone-50 transition-colors hover:text-stone-400',
              { 'opacity-0': isLastSlide }
            )}
          >
            <ArrowRightIcon className="h-8 w-8 fill-transparent" />
          </button>
        )
      }}
      renderBottomLeftControls={(props: ControlProps) => {
        const isFirstSlide = props.currentSlide === 0
        return (
          <button
            onClick={() => {
              if (showOverlay) {
                setShowOverlay(false)
              }
              setSlideIndex(!isFirstSlide ? props.currentSlide - 1 : 0)
              props.previousSlide()
            }}
            disabled={isFirstSlide}
            className={clsx(
              'ml-6 p-2 text-stone-50 transition-colors hover:text-stone-400',
              { 'opacity-0': isFirstSlide }
            )}
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
