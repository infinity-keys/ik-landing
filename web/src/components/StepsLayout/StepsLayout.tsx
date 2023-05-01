import { PropsWithChildren, lazy, Suspense } from 'react'

import { ThumbnailProgress } from '@infinity-keys/core'
import clsx from 'clsx'
import { FindAnonStepQuery, FindStepQuery } from 'types/graphql'

import { useAuth } from 'src/auth'
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

const StepComethApiButton = lazy(
  () => import('src/components/StepComethApiButton/StepComethApiButton')
)

const TokenIdRangeButton = lazy(
  () => import('src/components/TokenIdRangeButton/TokenIdRangeButton')
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
        {step && (
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
                    title="Hint"
                    content={`${step.resourceLinks}`}
                  />
                </div>
              )}
            </div>

            {!hasBeenSolved && (
              <>
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

                {step.type === 'COMETH_API' && (
                  <div className="pt-8">
                    <StepComethApiButton step={step} puzzleId={puzzle.id} />
                  </div>
                )}

                {step.type === 'TOKEN_ID_RANGE' && (
                  <div className="pt-8">
                    <TokenIdRangeButton step={step} puzzleId={puzzle.id} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </Suspense>

      <div className="my-4">{children}</div>

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
                  id={id}
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
