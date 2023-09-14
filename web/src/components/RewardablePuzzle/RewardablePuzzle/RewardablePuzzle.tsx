import { useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'
import { buildUrlString } from '@infinity-keys/core'
import type {
  FindRewardablePuzzleBySlug,
  PuzzleRequirements,
} from 'types/graphql'

import { routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button'
import Markdown from 'src/components/Markdown/Markdown'
import Seo from 'src/components/Seo/Seo'
import { requirementsLookup } from 'src/lib/puzzleRequirements'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'
import { useGlobalInfo } from 'src/providers/globalInfo/globalInfo'
import { useLoginModal } from 'src/providers/loginModal/loginModal'

import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: FindRewardablePuzzleBySlug['rewardable']
}

const Rewardable = ({ rewardable }: Props) => {
  const { isAuthenticated } = useAuth()
  const [showOverlay, setShowOverlay] = useState(false)
  const [currentOverlayContent, setCurrentOverlayContent] =
    useState<PuzzleRequirements | null>(null)
  const { setIsLoginModalOpen } = useLoginModal()
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

  // If currentStep is undefined, make sure it's because they've completed all steps
  const puzzleCompleted =
    !currentStep &&
    rewardable.puzzle.steps.every((step) => {
      return step?.hasUserCompletedStep
    })

  return (
    <>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name} puzzle?`}
        imageUrl={rewardable.puzzle.coverImage}
        url={url}
      />
      <div className="mx-auto max-w-lg md:max-w-5xl md:px-4">
        <h1 className="mb-14 hidden text-3xl font-semibold md:block">
          {pageHeading}
        </h1>

        <div className="flex flex-col justify-center pb-8 md:flex-row md:gap-6">
          <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden md:max-w-[50%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="w-full"
                src={rewardable.puzzle.coverImage}
                alt=""
              />
            </div>
          </div>
          <div className="relative flex w-full flex-1 flex-col gap-4 text-center md:max-w-[50%]">
            <div className="flex-1 border-y-2 border-stone-50">
              <div className="relative h-full">
                <div className="flex h-full min-h-[320px] flex-col justify-center px-12 py-6 md:min-h-[412px]">
                  {isAuthenticated ? (
                    puzzleCompleted ? (
                      <div className="text-sm md:text-base">
                        <p className="mb-4 text-base font-medium md:text-xl">
                          Hunt Finished!
                        </p>
                        <Markdown>
                          {rewardable.successMessage ||
                            'You have completed this hunt. Continue to claim your reward.'}
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
                          {rewardable.puzzle.requirements.map((req) =>
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

                                <span className="text-sm leading-none md:text-base">
                                  {requirementsLookup[req].labelElement}
                                </span>
                              </button>
                            ) : null
                          )}
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex justify-center">
                      <Alert text="Must be logged in to play." />
                    </div>
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
                  <div className="absolute top-0 flex h-full w-full items-center justify-center bg-stone-700 text-center">
                    <div className="flex flex-col items-center px-12 py-20">
                      <div className="mb-12">
                        <div className="puzzle-landing-icon--active mx-auto mb-2 h-12 w-12 text-transparent">
                          {currentOverlayContent &&
                            requirementsLookup[currentOverlayContent].icon}
                        </div>

                        {currentOverlayContent && (
                          <p className="text-sm leading-none md:text-base">
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
            </div>

            <div>
              {isAuthenticated ? (
                showOverlay ? (
                  <Button
                    text="Ask on Discord"
                    href="https://discord.gg/infinitykeys"
                  />
                ) : (
                  <Button
                    text={
                      typeof currentStep?.stepSortWeight === 'number'
                        ? currentStep.stepSortWeight > 1
                          ? 'Continue Quest'
                          : 'Start Quest'
                        : 'Claim Treasure'
                    }
                    to={
                      currentStep?.stepSortWeight
                        ? routes.puzzleStep({
                            slug: rewardable.slug,
                            step: currentStep?.stepSortWeight,
                          })
                        : // TODO: where do we take them if they have completed all steps
                          routes.claim({ id: rewardable.id })
                    }
                  />
                )
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  text="Login"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rewardable
