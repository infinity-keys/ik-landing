import { Fragment, PropsWithChildren, lazy, useEffect, useState } from 'react'

import clsx from 'clsx'
import sample from 'lodash/sample'
import { FindStepBySlugQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { CellSuccessProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import Markdown from 'src/components/Markdown/Markdown'
import MarkdownCarousel from 'src/components/MarkdownCarousel/MarkdownCarousel'
import NeedHintIcon from 'src/components/OverlayIcons/NeedHintIcon'
import NeedHintMiniIcon from 'src/components/OverlayIcons/NeedHintMiniIcon'
import StepPageLayout from 'src/components/StepPageLayout/StepPageLayout'
import CheckGreenIcon from 'src/components/StepProgressIcons/CheckGreenIcon'
import LockedIcon from 'src/components/StepProgressIcons/LockedIcon'
import { overlayContent } from 'src/lib/stepOverlayContent'
import { useGlobalInfo } from 'src/providers/globalInfo/globalInfo'

interface StepsLayoutProps extends PropsWithChildren {
  step: FindStepBySlugQuery['step']
  refetch?: NonNullable<CellSuccessProps['queryResult']>['refetch']
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

const successMessages = [
  'You nailed it!',
  'Look at you Sherlock...',
  "You're as awesome as a unicorn riding a skateboard!",
  'That was more satisfying than popping bubble wrap!',
  'Correct, excellent work.',
  'Bravo, smarty-pants!',
  "Well, aren't you a fine slice of pizza!",
]

const StepsLayout = ({ step, refetch }: StepsLayoutProps) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const { pageHeading, setPageHeading } = useGlobalInfo()

  useEffect(() => {
    if (step.puzzle.rewardable?.name) {
      const rewardableName = step.puzzle.rewardable?.name
      const currentStep = step.stepSortWeight
      const totalSteps = step.puzzle.steps.length

      setPageHeading(`${rewardableName} ${currentStep}-${totalSteps}`)
    }
  }, [
    setPageHeading,
    step.puzzle.rewardable?.name,
    step.stepSortWeight,
    step.puzzle.steps,
  ])

  if (!step) return <div className="text-center">Step not found.</div>

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

  const completedSteps = step.puzzle.steps.filter(
    (step) => step?.hasUserCompletedStep
  )
  const uncompletedSteps = step.puzzle.steps.length - completedSteps.length
  const isFinalStep = step.puzzle.steps.at(-1)?.id === step.id
  const remainingStepsText = `${uncompletedSteps} more
  ${uncompletedSteps > 1 ? 'steps' : 'step'} to go`

  return (
    <div className="mx-auto max-w-lg md:max-w-5xl md:px-4">
      <h1 className="mb-14 hidden text-4xl font-bold md:block">
        {pageHeading}
      </h1>
      <div className="flex  flex-col justify-center pb-8 md:flex-row md:gap-6">
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
                      className="w-full"
                    />
                  </div>
                )
              })}
            </div>

            {step.hasUserCompletedStep ? (
              <div className="relative flex w-full flex-1 flex-col gap-4 text-center md:max-w-[50%]">
                <div className="flex-1 border-y-2 border-stone-50">
                  <div className="relative h-full">
                    <div className="flex h-full flex-col justify-center gap-12 px-12 py-20 text-sm">
                      <div>
                        <p className="mb-2 font-bold text-white">
                          {isFinalStep
                            ? 'Hunt finished!'
                            : sample(successMessages)}
                        </p>
                        <p className="mb-10">
                          {uncompletedSteps > 0
                            ? remainingStepsText
                            : step.puzzle.rewardable.successMessage ||
                              'Puzzle Completed!'}
                        </p>
                        <div className="flex items-center justify-center">
                          {step.puzzle.steps.map((curStep, index) => {
                            if (!curStep) return null

                            return (
                              <Fragment key={curStep.id}>
                                {curStep?.hasUserCompletedStep ? (
                                  <CheckGreenIcon className="h-8 w-8" />
                                ) : (
                                  <LockedIcon className="h-8 w-8" />
                                )}
                                {index + 1 !== step.puzzle.steps.length && (
                                  <span className="h-[2px] max-w-[100px] flex-1 bg-white" />
                                )}
                              </Fragment>
                            )
                          })}
                        </div>
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
                        ? {
                            text: step.solutionHint,
                            icon: <NeedHintIcon />,
                            mini: <NeedHintMiniIcon />,
                          }
                        : undefined
                    }
                  >
                    <div className="text-center">
                      {step.type === 'SIMPLE_TEXT' && (
                        <SimpleTextInput
                          count={step.stepSimpleText?.solutionCharCount || 0}
                          step={step}
                          onSuccess={refetch}
                        />
                      )}

                      {(step.type === 'NFT_CHECK' ||
                        step.type === 'FUNCTION_CALL' ||
                        step.type === 'COMETH_API' ||
                        step.type === 'ORIUM_API' ||
                        step.type === 'ASSET_TRANSFER' ||
                        step.type === 'TOKEN_ID_RANGE' ||
                        step.type === 'ERC20_BALANCE') && (
                        <AccountCheckButton step={step} onSuccess={refetch} />
                      )}

                      {step.type === 'LENS_API' && (
                        <StepLensApiButton step={step} onSuccess={refetch} />
                      )}
                    </div>
                  </StepPageLayout>
                </MarkdownCarousel>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default StepsLayout
