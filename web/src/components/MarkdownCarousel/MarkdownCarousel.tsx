import { PropsWithChildren } from 'react'

import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon'
import Carousel, { ControlProps } from 'nuka-carousel'

const MarkdownCarousel = ({ children }: PropsWithChildren) => {
  return (
    <Carousel
      renderCenterRightControls={null}
      renderCenterLeftControls={null}
      renderBottomRightControls={(props: ControlProps) => (
        <button
          onClick={props.nextSlide}
          className="text-stone-50 transition-colors hover:text-brand-accent-secondary"
        >
          <ArrowRightIcon className="h-7 w-7 fill-transparent" />
        </button>
      )}
      renderBottomLeftControls={(props: ControlProps) => (
        <button
          onClick={props.previousSlide}
          className="text-stone-50 transition-colors hover:text-brand-accent-secondary"
        >
          <ArrowLeftIcon className="h-7 w-7 fill-transparent" />
        </button>
      )}
      defaultControlsConfig={{
        pagingDotsClassName: 'mx-[2px]',
      }}
      className="markdown flex h-full flex-col justify-center border-t-2 border-b-2 border-stone-400"
    >
      {children}
    </Carousel>
  )
}

export default MarkdownCarousel
