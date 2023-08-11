import { PropsWithChildren, lazy, Suspense, useState } from 'react'

import clsx from 'clsx'
import { FindStepBySlugQuery } from 'types/graphql'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import MarkdownCarousel from 'src/components/MarkdownCarousel/MarkdownCarousel'
import NeedHintIcon from 'src/components/OverlayIcons/NeedHintIcon'
import StepPageLayout from 'src/components/StepPageLayout/StepPageLayout'
import { overlayContent } from 'src/lib/stepOverlayContent'

interface StepsLayoutProps extends PropsWithChildren {
  puzzleId: string
  step: NonNullable<FindStepBySlugQuery['stepBySlug']>['step']
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

const StepsLayout = ({ puzzleId, step }: StepsLayoutProps) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  if (!puzzleId || !step) return null

  const images = step.stepPage
    .map((page) => page?.image || step.defaultImage)
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
                      src={image}
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
                          ? overlayContent[step.stepGuideType]
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
                  overlayContent={
                    step.solutionHint
                      ? { text: step.solutionHint, icon: <NeedHintIcon /> }
                      : undefined
                  }
                >
                  {step.type === 'SIMPLE_TEXT' && (
                    <SimpleTextInput
                      count={step.stepSimpleText?.solutionCharCount || 0}
                      step={step}
                      puzzleId={puzzleId}
                    />
                  )}

                  {(step.type === 'NFT_CHECK' ||
                    step.type === 'FUNCTION_CALL' ||
                    step.type === 'COMETH_API' ||
                    step.type === 'ORIUM_API' ||
                    step.type === 'ASSET_TRANSFER' ||
                    step.type === 'TOKEN_ID_RANGE' ||
                    step.type === 'ERC20_BALANCE') && (
                    <AccountCheckButton step={step} puzzleId={puzzleId} />
                  )}

                  {step.type === 'LENS_API' && (
                    <StepLensApiButton step={step} puzzleId={puzzleId} />
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
