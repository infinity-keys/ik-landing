import { PropsWithChildren, lazy, Suspense, useState } from 'react'

import { Transition } from '@headlessui/react'
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'
import { FindStepQuery } from 'types/graphql'

import { useAuth } from 'src/auth'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import MarkdownCarousel from 'src/components/MarkdownCarousel/MarkdownCarousel'

interface StepsLayoutProps extends PropsWithChildren {
  currentStepId?: string
  hasBeenSolved: boolean
  puzzle: FindStepQuery['puzzle']
  step: FindStepQuery['step']
  stepNum?: number
}

const SimpleTextInput = lazy(
  () => import('src/components/SimpleTextInput/SimpleTextInput')
)
const AccountCheckButton = lazy(
  () => import('src/components/AccountCheckButton/AccountCheckButton')
)
const StepLensApiButton = lazy(
  () => import('src/components/StepLensApiButton/StepLensApiButton')
)
// const ThumbnailMini = lazy(
//   () => import('src/components/ThumbnailMini/ThumbnailMini')
// )
// const CollapsibleMarkdown = lazy(
//   () => import('src/components/CollapsibleMarkdown/CollapsibleMarkdown')
// )

// const Alert = lazy(() => import('src/components/Alert/Alert'))
// const Button = lazy(() => import('src/components/Button/Button'))

const StepsLayout = ({
  hasBeenSolved,
  puzzle,
  step,
  stepNum,
  children,
}: StepsLayoutProps) => {
  const [showModal, setShowModal] = useState(false)

  if (!puzzle) return null

  return (
    <div className="flex justify-center pb-8">
      <Suspense fallback={<LoadingIcon />}>
        {step && (
          <div className="flex w-full max-w-lg flex-col md:max-w-5xl md:flex-row md:gap-8 md:px-6">
            <div className="flex-1 md:max-w-[50%]">
              <img
                // @TODO: remove || when field is required
                src={puzzle.coverImage || ''}
                alt=""
                className="block w-full"
              />
            </div>

            <div className="relative flex-1 md:max-w-[50%]">
              <MarkdownCarousel
                showModal={showModal}
                setShowModal={setShowModal}
              >
                {/* {step.body.map((text, i) => {
                  if (!text) return null
                  return (
                    <div key={i} className="markdown px-12 py-20">
                      <Markdown>{text}</Markdown>
                    </div>
                  )
                })} */}

                {step.challenge && (
                  <div className="relative h-full text-center">
                    <div className="flex h-full flex-col justify-between px-12">
                      <div className="markdown py-20">
                        <Markdown>{step.challenge}</Markdown>
                      </div>
                      <div className="relative z-40 flex justify-center">
                        <button onClick={() => setShowModal(!showModal)}>
                          <span className="block max-w-[226px]">
                            <TempSvg />
                          </span>
                        </button>
                      </div>
                    </div>
                    <TempModal show={showModal} setShowModal={setShowModal} />
                  </div>
                )}

                <div className="relative flex h-full flex-col justify-between px-12 text-center">
                  <div className="flex grow items-center justify-center py-20">
                    {step.type === 'SIMPLE_TEXT' && (
                      <SimpleTextInput
                        count={step.stepSimpleText?.solutionCharCount || 0}
                        step={step}
                        puzzleId={puzzle.id}
                        isAnon={puzzle.isAnon}
                      />
                    )}

                    {(step.type === 'NFT_CHECK' ||
                      step.type === 'FUNCTION_CALL' ||
                      step.type === 'COMETH_API' ||
                      step.type === 'ORIUM_API' ||
                      step.type === 'ASSET_TRANSFER' ||
                      step.type === 'TOKEN_ID_RANGE' ||
                      step.type === 'ERC20_BALANCE') && (
                      <AccountCheckButton step={step} puzzleId={puzzle.id} />
                    )}

                    {step.type === 'LENS_API' && (
                      <StepLensApiButton step={step} puzzleId={puzzle.id} />
                    )}
                  </div>

                  <div className="flex justify-center">
                    <div className="max-w-[226px]">
                      <TempSvg />
                    </div>
                  </div>
                </div>
              </MarkdownCarousel>
            </div>
          </div>
        )}
      </Suspense>

      <div>{children}</div>
    </div>
  )
}

export default StepsLayout

const TempModal = ({
  show,
  setShowModal,
}: {
  show: boolean
  setShowModal: (b: boolean) => void
}) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute top-0 z-10 flex h-full max-w-full items-center justify-center bg-stone-700">
        <div className="px-12 py-20">
          The passcode you are looking for can be found on the page.
        </div>
        <button
          onClick={() => setShowModal(false)}
          type="button"
          className="absolute top-4 right-4 transition-colors hover:text-brand-accent-secondary"
        >
          <XCircleIcon className="h-7 w-7 fill-transparent" />
        </button>
      </div>
    </Transition>
  )
}
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
