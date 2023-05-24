import { PropsWithChildren } from 'react'

import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon'
import ArrowRightIcon from '@heroicons/react/20/solid/ArrowRightIcon'
import Carousel, { ControlProps } from 'nuka-carousel'

const MarkdownCarousel = ({ children }: PropsWithChildren) => {
  return (
    <Carousel
      renderCenterRightControls={null}
      renderCenterLeftControls={null}
      renderBottomRightControls={(props: ControlProps) => (
        <button
          onClick={props.nextSlide}
          className="rounded-full bg-black/30 p-3 text-brand-accent-secondary transition-colors hover:bg-brand-accent-primary/20"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      )}
      renderBottomLeftControls={(props: ControlProps) => (
        <button
          onClick={props.previousSlide}
          className="rounded-full bg-black/30 p-3 text-brand-accent-secondary transition-colors hover:bg-brand-accent-primary/20"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
      )}
      defaultControlsConfig={{
        pagingDotsClassName: 'mx-[2px]',
      }}
      className="pb-14"
    >
      {children}
    </Carousel>
  )
}

export default MarkdownCarousel
