import { useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/20/solid'
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'
import { IK_LOGO_FULL_URL } from '@infinity-keys/constants'
import { buildUrlString } from '@infinity-keys/core'
import type {
  FindRewardablePuzzleBySlug,
  // FindEditPuzzleQueryVariables, shouldn't need this
  PuzzleRequirements,
} from 'types/graphql'

import { routes, useLocation } from '@redwoodjs/router'

// import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button'
// import EditRewardableCell from 'src/components/EditRewardableCell'
import Markdown from 'src/components/Markdown/Markdown'
import AbsoluteImage from 'src/components/PuzzleLayout/AbsoluteImage/AbsoluteImage'
import ImagesContainer from 'src/components/PuzzleLayout/ImageContainer/ImagesContainer'
import SectionContainer from 'src/components/PuzzleLayout/SectionContainer/SectionContainer'
import TextContainer from 'src/components/PuzzleLayout/TextContainer/TextContainer'
import Seo from 'src/components/Seo/Seo'
// import TrashPuzzleCell from 'src/components/TrashPuzzleCell'
import { requirementsLookup } from 'src/lib/puzzleRequirements'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'
import { useGlobalInfo } from 'src/providers/globalInfo/globalInfo'

import '@infinity-keys/react-lens-share-button/dist/style.css'

// // I don't think we need this for trashing puzzle but I'm not sure
// export const Loading = () => <div>Loading...</div>

// // I don't think we need this for trashing puzzle but I'm not sure
// export const Empty = () => <div>Empty!</div>

// // I don't think we need this for trashing puzzle but I'm not sure
// export const Failure = ({
//   error,
// }: CellFailureProps<FindEditPuzzleQueryVariables>) => (
//   <div style={{ color: 'red' }}>Error: {error?.message}</div>
// )

// // If we need the function above, we probably need this one too:
// export const Success = ({
//  // rest of code from EditRewardableCell.tsx
// })

interface Props {
  rewardable: FindRewardablePuzzleBySlug['rewardable']
}

const CLERK_SIGNIN_PORTAL_URL = process.env.CLERK_SIGNIN_PORTAL_URL

if (!CLERK_SIGNIN_PORTAL_URL) {
  throw new Error('Missing CLERK_SIGNIN_PORTAL_URL variable')
}

const Rewardable = ({ rewardable }: Props) => {
  const { isAuthenticated } = useAuth()
  const [showOverlay, setShowOverlay] = useState(false)
  const [currentOverlayContent, setCurrentOverlayContent] =
    useState<PuzzleRequirements | null>(null)
  const { pageHeading, setPageHeading } = useGlobalInfo()

  useEffect(() => {
    if (rewardable?.name) {
      setPageHeading(rewardable.name)
    }
  }, [setPageHeading, rewardable?.name])

  if (!rewardable?.puzzle) {
    return <div className="text-center">Could not find puzzle.</div>
  }

  // the full https url to this page
  const url = buildUrlString(
    rewardableLandingRoute({
      slug: rewardable.slug,
      type: 'PUZZLE',
    })
  )

  // NOTE: returns undefined if user has completed all steps
  const currentStep = rewardable.puzzle.steps.find((step) => {
    return !step ? false : !step.hasUserCompletedStep
  })

  // If currentStep is undefined, make sure it's because they've completed all
  // steps, or they have a userReward
  const puzzleCompleted =
    !!rewardable.userRewards.length ||
    (!currentStep &&
      rewardable.puzzle.steps.every((step) => step?.hasUserCompletedStep))

  const shouldContinue =
    typeof currentStep?.stepSortWeight === 'number' &&
    currentStep.stepSortWeight > 1

  return (
    <>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name} puzzle?`}
        imageUrl={rewardable.puzzle.coverImage || IK_LOGO_FULL_URL}
        url={url}
      />

      <SectionContainer pageHeading={pageHeading}>
        <ImagesContainer>
          <AbsoluteImage>
            <img
              className="w-full"
              src={rewardable.puzzle.coverImage || IK_LOGO_FULL_URL}
              alt=""
            />
          </AbsoluteImage>
        </ImagesContainer>

        <TextContainer
          Button={
            <TextContainerButton
              shouldContinue={shouldContinue}
              isAuthenticated={isAuthenticated}
              // set ack to original state when modal is in use `showOverlay={showOverlay}`
              showOverlay={false}
              puzzleCompleted={puzzleCompleted}
              rewardable={rewardable}
              currentStep={
                typeof currentStep?.stepSortWeight === 'number'
                  ? currentStep.stepSortWeight
                  : // @NOTE: If users can manually enter sort weight when creating,
                    // `1` isn't necessarily the first step
                    1
              }
            />
          }
        >
          {isAuthenticated ? (
            puzzleCompleted ? (
              <div className="text-sm md:text-base">
                <Markdown>
                  {rewardable.successMessage || 'Claim your reward.'}
                </Markdown>
              </div>
            ) : (
              <div>
                <div className="mb-12">
                  <p className="mb-1 text-lg font-medium md:text-xl">
                    Get Ready!
                  </p>
                  <p className="text-sm md:text-base">
                    Check the items below before you jump in.
                  </p>
                </div>

                <div className="relative flex flex-wrap justify-center gap-10">
                  {rewardable.puzzle?.requirements?.map((req) =>
                    req ? (
                      <button
                        key={req}
                        onClick={() => {
                          setCurrentOverlayContent(req)
                          setShowOverlay(true)
                        }}
                        className="flex flex-col items-center text-sm leading-none transition-opacity hover:opacity-60 md:text-base"
                      >
                        <span className="puzzle-landing-icon mx-auto mb-2 block h-8 w-8 text-transparent md:h-12 md:w-12">
                          {requirementsLookup[req].icon}
                        </span>

                        <span className="text-sm leading-none md:text-base md:leading-none">
                          {requirementsLookup[req].labelElement}
                        </span>
                      </button>
                    ) : null
                  )}
                </div>

                <Transition
                  show={showOverlay}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-stone-700 text-center">
                    <div className="flex flex-col items-center px-12 py-20">
                      <div className="mb-12">
                        <div className="puzzle-landing-icon--active mx-auto mb-2 h-12 w-12 text-transparent">
                          {currentOverlayContent &&
                            requirementsLookup[currentOverlayContent].icon}
                        </div>

                        {currentOverlayContent && (
                          <p className="text-sm leading-none md:text-base md:leading-none">
                            {
                              requirementsLookup[currentOverlayContent]
                                .labelElement
                            }
                          </p>
                        )}
                      </div>
                      <p className="text-sm md:text-base">
                        {currentOverlayContent &&
                          requirementsLookup[currentOverlayContent].text}
                      </p>
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
              </div>
            )
          ) : (
            <div className="flex justify-center">
              <Alert text="Must be logged in to play." />
            </div>
          )}
        </TextContainer>
        {isAuthenticated && rewardable.userCanEdit && (
          <div>
            <div className="mt-5 flex justify-center">
              <Button
                to={routes.editFormArchetype({ slug: rewardable.slug })}
                shadow
                bold
                solid
              >
                Edit this Puzzle
              </Button>
            </div>
            <div className="mt-5 flex justify-center">
              <Button>
                <TrashIcon className="h-5 w-5" />
                &nbsp; Trash Puzzle
              </Button>
            </div>
          </div>
        )}
      </SectionContainer>
    </>
  )
}

export default Rewardable

const TextContainerButton = ({
  isAuthenticated,
  showOverlay,
  puzzleCompleted,
  shouldContinue,
  rewardable,
  currentStep,
}: {
  isAuthenticated: boolean
  showOverlay: boolean
  puzzleCompleted: boolean
  shouldContinue: boolean
  rewardable: Props['rewardable']
  currentStep: number
}) => {
  const { pathname } = useLocation()

  if (!rewardable) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <Button
        bold
        solid
        shadow
        href={`${CLERK_SIGNIN_PORTAL_URL}?redirect_url=${window.location.origin}${pathname}`}
        openInNewTab={false}
      >
        Login
      </Button>
    )
  }

  if (showOverlay) {
    return (
      <Button solid shadow bold href="https://discord.gg/infinitykeys">
        Ask on Discord
      </Button>
    )
  }

  if (puzzleCompleted) {
    return (
      <Button solid shadow bold to={routes.claim({ id: rewardable.id })}>
        Claim Treasure
      </Button>
    )
  }

  return (
    <Button
      solid
      shadow
      bold
      to={routes.puzzleStep({
        slug: rewardable.slug,
        step: currentStep,
      })}
    >
      {shouldContinue ? 'Continue Quest' : 'Start'}
    </Button>
  )
}
