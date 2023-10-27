import { PropsWithChildren, ReactElement } from 'react'

import { Transition } from '@headlessui/react'
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'

import Markdown from 'src/components/Markdown/Markdown'

interface OverlayContent {
  text: string
  icon: ReactElement
  mini: ReactElement
}
interface StepPageProps extends PropsWithChildren {
  showOverlay?: boolean
  overlayContent?: OverlayContent
  setShowOverlay?: (b: boolean) => void
}

const StepPageLayout = ({
  showOverlay,
  overlayContent,
  setShowOverlay,
  children,
}: StepPageProps) => {
  const hasOverlay =
    overlayContent &&
    typeof showOverlay !== 'undefined' &&
    typeof setShowOverlay !== 'undefined'

  return (
    <div className="relative h-full min-h-[300px] md:min-h-[412px]">
      <div className="flex h-full flex-col justify-between px-12">
        <div className="markdown flex w-full flex-1 items-center py-6">
          <div className="w-full">{children}</div>
        </div>
        {hasOverlay && (
          <div className="relative z-40 flex justify-center">
            <button onClick={() => setShowOverlay(!showOverlay)}>
              <span className="overlay-icon hidden max-w-[226px] text-transparent md:block">
                {overlayContent.icon}
              </span>
              <span className=" overlay-icon block max-w-[158px] text-transparent md:hidden">
                {overlayContent.mini}
              </span>
            </button>
          </div>
        )}
      </div>
      {hasOverlay && (
        <Transition
          show={showOverlay}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-0 z-10 flex h-full w-full items-center justify-center bg-stone-700 text-center">
            <div className="px-12 py-20 text-sm md:text-base">
              <Markdown>{overlayContent.text}</Markdown>
            </div>
            <button
              onClick={() => setShowOverlay(false)}
              type="button"
              className="absolute top-4 right-4 transition-colors hover:text-brand-accent-secondary"
            >
              <XCircleIcon className="h-7 w-7 fill-transparent" />
            </button>
          </div>
        </Transition>
      )}
    </div>
  )
}

export default StepPageLayout
