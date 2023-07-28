import { PropsWithChildren, lazy, Suspense, useState } from 'react'

import clsx from 'clsx'
import { FindStepQuery } from 'types/graphql'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import MarkdownCarousel from 'src/components/MarkdownCarousel/MarkdownCarousel'
import StepPageLayout from 'src/components/StepPageLayout/StepPageLayout'

interface StepsLayoutProps extends PropsWithChildren {
  puzzle: FindStepQuery['puzzle']
  step: FindStepQuery['step']
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

const StepsLayout = ({ puzzle, step }: StepsLayoutProps) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  if (!puzzle || !step) return null

  const images = step.stepPage
    .map((page) => page?.image)
    .concat(step.solutionImage || step.defaultImage)

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center pb-8 md:max-w-5xl md:flex-row md:gap-6 md:px-4 ">
      <Suspense fallback={<LoadingIcon />}>
        {step.stepPage && (
          <>
            <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden md:max-w-[50%]">
              {images.map((image, index) => {
                return (
                  <div
                    key={'image-' + index}
                    className={clsx(
                      'absolute inset-0 flex items-center justify-center',
                      index === slideIndex ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    <img
                      src={image || step.defaultImage}
                      alt=""
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                )
              })}
            </div>

            <div className="relative mb-12 w-full flex-1 border-y-2 border-t-2 border-stone-50 md:max-w-[50%]">
              <MarkdownCarousel
                showOverlay={showOverlay}
                setShowOverlay={setShowOverlay}
                setSlideIndex={setSlideIndex}
              >
                {step.stepPage.map((page) => {
                  if (!page) return null

                  return (
                    <StepPageLayout
                      key={page.id}
                      showOverlay={showOverlay}
                      setShowOverlay={setShowOverlay}
                      overlayContent={
                        page.showStepGuideHint
                          ? // @TODO: This will become dynamic
                            'The passcode you are looking for can be found on the page'
                          : undefined
                      }
                    >
                      <Markdown>{page.body}</Markdown>
                    </StepPageLayout>
                  )
                })}

                <StepPageLayout
                  showOverlay={showOverlay}
                  setShowOverlay={setShowOverlay}
                  overlayContent={step.solutionHint}
                >
                  {step.type === 'SIMPLE_TEXT' && (
                    <SimpleTextInput
                      count={step.stepSimpleText?.solutionCharCount || 0}
                      step={step}
                      puzzleId={puzzle.id}
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
                </StepPageLayout>
              </MarkdownCarousel>
            </div>
          </>
        )}
      </Suspense>
    </div>
  )
}

export default StepsLayout
