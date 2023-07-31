import { PropsWithChildren, ReactElement } from 'react'

import { Transition } from '@headlessui/react'
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'
import clsx from 'clsx'

import Markdown from 'src/components/Markdown/Markdown'

interface OverlayContent {
  text: string
  icon: ReactElement
}
interface StepPageProps extends PropsWithChildren {
  withOverlay?: boolean
  showOverlay?: boolean
  overlayContent?: OverlayContent
  setShowOverlay?: (b: boolean) => void
}

const StepPageLayout = ({
  withOverlay = false,
  showOverlay,
  overlayContent,
  setShowOverlay,
  children,
}: StepPageProps) => {
  const hasModal =
    overlayContent &&
    typeof showOverlay !== 'undefined' &&
    typeof setShowOverlay !== 'undefined'

  return (
    <div className="relative h-full">
      <div className="flex h-full flex-col justify-between px-12">
        <div
          className={clsx('markdown', withOverlay ? 'pt-20 pb-10' : 'py-20')}
        >
          {children}
        </div>
        {hasModal && (
          <div className="relative z-40 flex justify-center">
            <button onClick={() => setShowOverlay(!showOverlay)}>
              <span className="block max-w-[226px]">{overlayContent.icon}</span>
            </button>
          </div>
        )}
      </div>
      {hasModal && (
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
            <div className="px-12 py-20">
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
