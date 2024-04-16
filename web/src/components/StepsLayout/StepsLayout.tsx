import { Fragment, PropsWithChildren, lazy, useEffect, useState } from 'react'

import { cloudinaryUrl } from '@infinity-keys/core'
import Spline from '@splinetool/react-spline'
import clsx from 'clsx'
import sample from 'lodash/sample'
import { FindStepBySlugQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { CellSuccessProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import ImageWithFallback from 'src/components/ImageWithFallback/ImageWithFallback'
import Markdown from 'src/components/Markdown/Markdown'
import NeedHintIcon from 'src/components/OverlayIcons/NeedHintIcon'
import NeedHintMiniIcon from 'src/components/OverlayIcons/NeedHintMiniIcon'
import AbsoluteImage from 'src/components/PuzzleLayout/AbsoluteImage/AbsoluteImage'
import ImageContainer from 'src/components/PuzzleLayout/ImageContainer/ImagesContainer'
import MarkdownCarousel from 'src/components/PuzzleLayout/MarkdownCarousel/MarkdownCarousel'
import SectionContainer from 'src/components/PuzzleLayout/SectionContainer/SectionContainer'
import TextContainer from 'src/components/PuzzleLayout/TextContainer/TextContainer'
import StepPageLayout from 'src/components/StepPageLayout/StepPageLayout'
import LockedIcon from 'src/components/StepProgressIcons/LockedIcon'
import UnlockedIcon from 'src/components/StepProgressIcons/UnlockedIcon'
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

  const rewardableName = step.puzzle.rewardable?.name
  const currentStepNum = step.stepSortWeight
  const totalSteps = step.puzzle.steps.length

  useEffect(() => {
    if (rewardableName) {
      setPageHeading(`${rewardableName} ${currentStepNum}-${totalSteps}`)
    }
  }, [setPageHeading, rewardableName, currentStepNum, totalSteps])

  const images = step.stepPage
    ?.map((page) => page?.image || step.defaultImage)
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
  const uncompletedSteps = totalSteps - completedSteps.length
  const isFinalStep = step.puzzle.steps.at(-1)?.id === step.id
  const remainingStepsText = `${uncompletedSteps} more
  ${uncompletedSteps > 1 ? 'steps' : 'step'} to go`

  return (
    <SectionContainer pageHeading={pageHeading}>
      {step.stepPage && (
        <>
          <ImageContainer>
            {step.puzzle.rewardable.slug === process.env.SPLINE_PUZZLE_SLUG ? (
              <Spline scene="https://prod.spline.design/wNPv9pIE4aOGShZZ/scene.splinecode" />
            ) : (
              images?.map((image, index) => {
                return image ? (
                  <AbsoluteImage key={'image-' + index}>
                    <ImageWithFallback
                      src={image}
                      fallback={
                        step.puzzle.rewardable.nfts[0]?.cloudinaryId
                          ? cloudinaryUrl(
                              step.puzzle.rewardable.nfts[0]?.cloudinaryId,
                              800,
                              800,
                              false,
                              2
                            )
                          : ''
                      }
                      alt=""
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className={clsx(
                        'w-full',
                        index === slideIndex ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </AbsoluteImage>
                ) : null
              })
            )}
          </ImageContainer>

          {step.hasUserCompletedStep ? (
            <TextContainer
              Button={
                <Button
                  solid
                  shadow
                  bold
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
                >
                  Continue
                </Button>
              }
            >
              <div>
                <p className="mb-2 text-base font-medium md:text-xl">
                  {isFinalStep ? 'Complete!' : sample(successMessages)}
                </p>
                <p className="mb-10 text-sm md:text-base">
                  {uncompletedSteps > 0
                    ? remainingStepsText
                    : step.puzzle.rewardable.successMessage || ''}
                </p>
                <div className="flex items-center justify-center">
                  {step.puzzle.steps.map((curStep, index) => {
                    if (!curStep) return null
                    const isCompleted = curStep.hasUserCompletedStep

                    return (
                      <Fragment key={curStep.id}>
                        <div
                          className={clsx(
                            'flex h-12 w-12 items-center justify-center rounded text-transparent',
                            isCompleted ? 'bg-green-650' : 'bg-stone-700'
                          )}
                        >
                          {isCompleted ? <UnlockedIcon /> : <LockedIcon />}
                        </div>

                        {index + 1 !== step.puzzle.steps.length && (
                          <span className="h-1 max-w-[26px] flex-1 bg-stone-700" />
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            </TextContainer>
          ) : (
            <div className="relative mb-16 border-y-2 border-t-2 border-stone-50">
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
                      disableModal={true}
                      setShowOverlay={setShowOverlay}
                      overlayContent={
                        page.showStepGuideHint && step.stepGuideType
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
                  <div className="w-full text-center">
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
    </SectionContainer>
  )
}

export default StepsLayout
