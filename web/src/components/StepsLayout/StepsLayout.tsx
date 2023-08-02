import { PropsWithChildren, lazy, useState } from 'react'

import clsx from 'clsx'
import { FindStepBySlugQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { CellSuccessProps } from '@redwoodjs/web'

import Markdown from 'src/components/Markdown/Markdown'
import MarkdownCarousel from 'src/components/MarkdownCarousel/MarkdownCarousel'
import NeedHintIcon from 'src/components/OverlayIcons/NeedHintIcon'
import StepPageLayout from 'src/components/StepPageLayout/StepPageLayout'
import { overlayContent } from 'src/lib/stepOverlayContent'

import Button from '../Button'

interface StepsLayoutProps extends PropsWithChildren {
  puzzleId: string
  step: NonNullable<FindStepBySlugQuery['stepBySlug']>['step']
  queryResult: CellSuccessProps['queryResult']
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

const StepsLayout = ({ puzzleId, step, queryResult }: StepsLayoutProps) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  if (!puzzleId || !step) return null

  const images = step.stepPage
    .map((page) => page?.image || step.defaultImage)
    .concat(step.solutionImage || step.defaultImage)

  // @NOTE: returns undefined if user has completed all steps
  const nextStep = step.hasUserCompletedStep
    ? step.puzzle.steps.find((step) => {
        if (!step) {
          return false
        }
        return !step.hasUserCompletedStep
      })
    : undefined

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center pb-8 md:max-w-5xl md:flex-row md:gap-6 md:px-4 ">
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

          {step.hasUserCompletedStep ? (
            <div className="relative flex w-full flex-1 flex-col gap-4 text-center md:max-w-[50%]">
              <div className="flex-1 border-y-2 border-stone-50">
                <div className="relative h-full">
                  <div className="flex h-full flex-col justify-center gap-12 px-12 py-20">
                    <div>
                      <div className="flex justify-center">success</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  text="Continue"
                  to={
                    nextStep
                      ? routes.puzzleStep({
                          slug: step.puzzle.rewardable.slug,
                          step: nextStep.stepSortWeight,
                        })
                      : routes.puzzleLanding({
                          slug: step.puzzle.rewardable.slug,
                        })
                  }
                />
              </div>
            </div>
          ) : (
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
                      onSuccess={queryResult?.refetch}
                    />
                  )}

                  {(step.type === 'NFT_CHECK' ||
                    step.type === 'FUNCTION_CALL' ||
                    step.type === 'COMETH_API' ||
                    step.type === 'ORIUM_API' ||
                    step.type === 'ASSET_TRANSFER' ||
                    step.type === 'TOKEN_ID_RANGE' ||
                    step.type === 'ERC20_BALANCE') && (
                    <AccountCheckButton
                      step={step}
                      puzzleId={puzzleId}
                      onSuccess={queryResult?.refetch}
                    />
                  )}

                  {step.type === 'LENS_API' && (
                    <StepLensApiButton
                      step={step}
                      puzzleId={puzzleId}
                      onSuccess={queryResult?.refetch}
                    />
                  )}
                </StepPageLayout>
              </MarkdownCarousel>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StepsLayout
