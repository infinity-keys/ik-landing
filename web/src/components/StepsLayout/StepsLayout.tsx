import { PropsWithChildren, lazy, Suspense } from 'react'
import clsx from 'clsx'

import { ThumbnailProgress } from '@infinity-keys/core'
import { FindAnonStepQuery, FindStepQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { routes, useParams } from '@redwoodjs/router'

import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'

interface StepsLayoutProps extends PropsWithChildren {
  currentStepId: string
  hasBeenSolved: boolean
  puzzle: FindAnonStepQuery['puzzle'] | FindStepQuery['puzzle']
  step: FindAnonStepQuery['step'] | FindStepQuery['step']
}

const SimpleTextInput = lazy(
  () => import('src/components/SimpleTextInput/SimpleTextInput')
)
const NftCheckButton = lazy(
  () => import('src/components/NftCheckButton/NftCheckButton')
)

const StepFunctionCallButton = lazy(
  () => import('src/components/StepFunctionCallButton/StepFunctionCallButton')
)

const StepsLayout = ({
  currentStepId,
  hasBeenSolved,
  puzzle,
  step,
  children,
}: StepsLayoutProps) => {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <Suspense fallback={<LoadingIcon />}>
        {step && !hasBeenSolved && (
          <div>
            <div className="mx-auto max-w-prose rounded-md bg-black/10">
              {step.challenge && (
                <div className="p-4">
                  <CollapsibleMarkdown
                    title="Challenge"
                    content={step.challenge}
                    defaultOpen
                  />
                </div>
              )}

              {step.resourceLinks && (
                <div className={clsx('p-4', { 'pt-0': step.challenge })}>
                  <CollapsibleMarkdown
                    title="Links"
                    content={`${step.resourceLinks}`}
                  />
                </div>
              )}
            </div>

            {step.type === 'SIMPLE_TEXT' && (
              <div className="pt-8">
                <SimpleTextInput
                  count={step.stepSimpleText.solutionCharCount}
                  step={step}
                  puzzleId={puzzle.id}
                  isAnon={puzzle.isAnon}
                />
              </div>
            )}

            {step.type === 'NFT_CHECK' && (
              <div className="pt-8">
                <NftCheckButton step={step} puzzleId={puzzle.id} />
              </div>
            )}

            {step.type === 'FUNCTION_CALL' && (
              <div className="pt-8">
                <StepFunctionCallButton step={step} puzzleId={puzzle.id} />
              </div>
            )}
          </div>
        )}
      </Suspense>

      <div className="mb-4">{children}</div>

      {(!step || !hasBeenSolved) && (
        <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-4 sm:flex-row">
          {puzzle.steps.map(
            ({
              id,
              stepSortWeight,
              hasUserCompletedStep,
              hasAnonUserCompletedStep,
            }) => {
              const routeParams = {
                slug,
                step: stepSortWeight,
              }
              const completed = isAuthenticated
                ? hasUserCompletedStep
                : hasAnonUserCompletedStep
              return (
                <ThumbnailMini
                  key={stepSortWeight}
                  name={`Step ${stepSortWeight.toString()}`}
                  progress={
                    hasBeenSolved
                      ? ThumbnailProgress.Completed
                      : currentStepId === id
                      ? ThumbnailProgress.Current
                      : completed
                      ? ThumbnailProgress.Completed
                      : ThumbnailProgress.NotCompleted
                  }
                  to={
                    isAuthenticated && !puzzle.isAnon
                      ? routes.puzzleStep(routeParams)
                      : routes.anonPuzzleStep(routeParams)
                  }
                />
              )
            }
          )}
        </div>
      )}
    </div>
  )
}

export default StepsLayout
