import { PropsWithChildren, ReactElement } from 'react'

import { Transition } from '@headlessui/react'
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'
import clsx from 'clsx'
import { StepGuideType } from 'types/graphql'

import Markdown from 'src/components/Markdown/Markdown'

import ActivateIcon from '../OverlayIcons/ActivateIcon'
import CollectIcon from '../OverlayIcons/CollectIcon'
import RewindIcon from '../OverlayIcons/RewindIcon'
import SeekIcon from '../OverlayIcons/SeekIcon'
import SolveIcon from '../OverlayIcons/SolveIcon'
import TrackIcon from '../OverlayIcons/TrackIcon'

interface StepPageProps extends PropsWithChildren {
  withOverlay?: boolean
  showOverlay?: boolean
  overlayContent?: string
  setShowOverlay?: (b: boolean) => void
}

const overlayContent: {
  [key in StepGuideType]: {
    text: string
    icon: ReactElement
  }
} = {
  SEEK: {
    text: 'The passcode you are looking for can be found on the page',
    icon: <SeekIcon />,
  },
  ACTIVATE: {
    text: 'Complete steps described to pass this test. No thinking required!',
    icon: <ActivateIcon />,
  },
  COLLECT: {
    text: "To complete this step, mint the digital collectible in the link. It's free!",
    icon: <CollectIcon />,
  },
  REWIND: {
    text: 'Missing something? Go back and look for helpful clues.',
    icon: <RewindIcon />,
  },
  INFER: {
    text: 'Unscramble a puzzle. The answer needs to be found and solved.',
    icon: <SolveIcon />,
  },
  TRACK: {
    text: 'Piece of cake! Just follow the accounts on the link to solve this step.',
    icon: <TrackIcon />,
  },
  // all the other ones go here
}

console.log(overlayContent)

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
              <span className="block max-w-[226px]">
                <TempSvg />
              </span>
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
              <Markdown>{overlayContent}</Markdown>
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

// @TODO: remove this when the real SVGs are brought over
const TempSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 226 81"
      fill="none"
      className="w-full fill-transparent"
    >
      <path
        stroke="#FAFAF9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M117.634 57.361a6.876 6.876 0 1 0-9.726-9.722 6.876 6.876 0 0 0 9.726 9.722Z"
      />
      <path
        stroke="#FAFAF9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M90.905 52.5c2.92-9.297 11.607-16.042 21.867-16.042 10.262 0 18.948 6.745 21.867 16.042-2.919 9.297-11.605 16.042-21.867 16.042-10.26 0-18.947-6.745-21.867-16.042Z"
      />
      <path
        fill="#FAFAF9"
        d="M98.306 12.112c-.736 0-1.398-.128-1.984-.384-.576-.267-1.03-.63-1.36-1.088a2.825 2.825 0 0 1-.512-1.616h1.552c.053.523.266.965.64 1.328.384.352.938.528 1.664.528.693 0 1.237-.17 1.632-.512.405-.352.608-.8.608-1.344 0-.427-.118-.773-.352-1.04a2.251 2.251 0 0 0-.88-.608 13.752 13.752 0 0 0-1.424-.448c-.736-.192-1.328-.384-1.776-.576a2.949 2.949 0 0 1-1.136-.896c-.31-.416-.464-.97-.464-1.664 0-.608.154-1.147.464-1.616a3.03 3.03 0 0 1 1.296-1.088c.565-.256 1.21-.384 1.936-.384 1.045 0 1.898.261 2.56.784.672.523 1.05 1.216 1.136 2.08h-1.6c-.054-.427-.278-.8-.672-1.12-.395-.33-.918-.496-1.568-.496-.608 0-1.104.16-1.488.48-.384.31-.576.747-.576 1.312 0 .405.112.736.336.992.234.256.517.453.848.592.341.128.816.277 1.424.448.736.203 1.328.405 1.776.608.448.192.832.496 1.152.912.32.405.48.96.48 1.664 0 .544-.144 1.056-.432 1.536-.288.48-.715.87-1.28 1.168-.566.299-1.232.448-2 .448ZM112.16 7.28c0 .277-.016.57-.048.88h-7.008c.054.864.347 1.541.88 2.032.544.48 1.2.72 1.968.72.63 0 1.152-.144 1.568-.432.427-.299.726-.693.896-1.184h1.568a3.804 3.804 0 0 1-1.408 2.064c-.704.523-1.578.784-2.624.784-.832 0-1.578-.187-2.24-.56A4.001 4.001 0 0 1 104.176 10c-.373-.693-.56-1.493-.56-2.4 0-.907.182-1.701.544-2.384a3.787 3.787 0 0 1 1.52-1.568c.662-.373 1.419-.56 2.272-.56.832 0 1.568.181 2.208.544.64.363 1.131.864 1.472 1.504.352.63.528 1.344.528 2.144Zm-1.504-.304c0-.555-.122-1.03-.368-1.424a2.312 2.312 0 0 0-1.008-.912 3.006 3.006 0 0 0-1.392-.32c-.736 0-1.365.235-1.888.704-.512.47-.805 1.12-.88 1.952h5.536Zm11.426.304c0 .277-.016.57-.048.88h-7.008c.054.864.347 1.541.88 2.032.544.48 1.2.72 1.968.72.63 0 1.152-.144 1.568-.432.427-.299.726-.693.896-1.184h1.568a3.804 3.804 0 0 1-1.408 2.064c-.704.523-1.578.784-2.624.784-.832 0-1.578-.187-2.24-.56A4.001 4.001 0 0 1 114.098 10c-.373-.693-.56-1.493-.56-2.4 0-.907.182-1.701.544-2.384a3.787 3.787 0 0 1 1.52-1.568c.662-.373 1.419-.56 2.272-.56.832 0 1.568.181 2.208.544.64.363 1.131.864 1.472 1.504.352.63.528 1.344.528 2.144Zm-1.504-.304c0-.555-.122-1.03-.368-1.424a2.312 2.312 0 0 0-1.008-.912 3.006 3.006 0 0 0-1.392-.32c-.736 0-1.365.235-1.888.704-.512.47-.805 1.12-.88 1.952h5.536ZM128.9 12l-3.44-3.872V12h-1.456V.16h1.456v6.96l3.376-3.888h2.032L126.74 7.6l4.144 4.4H128.9Z"
      />
      <path
        fill="#FAFAF9"
        fillRule="evenodd"
        d="M222.847 81c-24.808-33.948-64.924-56-110.19-56-45.266 0-85.381 22.052-110.19 56H0c25.1-35.113 66.205-58 112.657-58s87.558 22.887 112.657 58h-2.467Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
