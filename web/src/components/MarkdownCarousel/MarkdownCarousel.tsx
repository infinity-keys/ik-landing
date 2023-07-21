import { PropsWithChildren } from 'react'

import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon'
import Carousel, { ControlProps } from 'nuka-carousel'

const MarkdownCarousel = ({
  children,
  showModal,
  setShowModal,
}: PropsWithChildren & {
  showModal: boolean
  setShowModal: (b: boolean) => void
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

            props.nextSlide()
          }}
          className="mr-8 text-stone-50 transition-colors hover:text-brand-accent-secondary md:absolute md:right-8 md:bottom-2 md:mr-0"
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
              props.previousSlide()
            }}
            className="ml-8 text-stone-50 transition-colors hover:text-brand-accent-secondary md:absolute md:left-1/2 md:bottom-2"
          >
            <ArrowLeftIcon className="h-7 w-7 fill-transparent" />
          </button>
        )
      }}
      defaultControlsConfig={{
        pagingDotsClassName: 'mx-[2px]',
      }}
      className="w-full max-w-lg border-b-2 border-stone-50 md:max-w-5xl md:border-b-0"
    >
      {children}
    </Carousel>
  )
}

export default MarkdownCarousel
