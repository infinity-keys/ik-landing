import { PropsWithChildren } from 'react'

import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon'
import Carousel, { ControlProps } from 'nuka-carousel'

const MarkdownCarousel = ({
  children,
  showModal,
  setShowModal,
  setSlideIndex,
}: PropsWithChildren & {
  showModal: boolean
  setShowModal: (b: boolean) => void
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
            if (showModal) {
              setShowModal(false)
            }
            console.log(props)
            setSlideIndex(
              props.currentSlide + 1 === props.slideCount
                ? props.currentSlide
                : props.currentSlide + 1
            )
            props.nextSlide()
          }}
          className="relative -bottom-12 right-8 text-stone-50 transition-colors hover:text-brand-accent-secondary"
        >
          <ArrowRightIcon className="h-7 w-7 fill-transparent" />
        </button>
      )}
      renderBottomLeftControls={(props: ControlProps) => {
        return (
          <button
            onClick={() => {
              if (showModal) {
                setShowModal(false)
              }
              setSlideIndex(props.currentSlide > 0 ? props.currentSlide - 1 : 0)
              props.previousSlide()
            }}
            className="relative -bottom-12 left-8 text-stone-50 transition-colors hover:text-brand-accent-secondary"
          >
            <ArrowLeftIcon className="h-7 w-7 fill-transparent" />
          </button>
        )
      }}
      defaultControlsConfig={{
        pagingDotsClassName: 'mx-[2px] relative -bottom-12',
      }}
      className="h-full w-full"
    >
      {children}
    </Carousel>
  )
}

export default MarkdownCarousel
