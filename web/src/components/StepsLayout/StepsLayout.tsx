import { PropsWithChildren, lazy, Suspense } from 'react'

import { ThumbnailProgress } from '@infinity-keys/core'
import clsx from 'clsx'
import { FindAnonStepQuery, FindStepQuery } from 'types/graphql'

import { routes, useParams } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'

interface StepsLayoutProps extends PropsWithChildren {
  currentStepId?: string
  hasBeenSolved: boolean
  puzzle: FindAnonStepQuery['puzzle'] | FindStepQuery['puzzle']
  step: FindAnonStepQuery['step'] | FindStepQuery['step']
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

const StepsLayout = ({
  currentStepId,
  hasBeenSolved,
  puzzle,
  step,
  stepNum,
  children,
}: StepsLayoutProps) => {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()

  if (!puzzle) return null
  const showButton = !stepNum && puzzle?.rewardable

  return (
    <div>
      {showButton && (
        <div className="mb-6">
          {isAuthenticated ? (
            <Button
              {...(hasBeenSolved
                ? { to: routes.claim({ id: puzzle.rewardable.id }) }
                : {})}
              text="Claim"
              disabled={!hasBeenSolved}
            />
          ) : (
            <div className="flex justify-center">
              <Alert text="Please sign in to claim" />
            </div>
          )}
        </div>
      )}

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

            {step.type === 'SIMPLE_TEXT' && (
              <div className="pt-8">
                <SimpleTextInput
                  count={step.stepSimpleText?.solutionCharCount || 0}
                  step={step}
                  puzzleId={puzzle.id}
                  isAnon={puzzle.isAnon}
                />
              </div>
            )}

            {(step.type === 'NFT_CHECK' ||
              step.type === 'FUNCTION_CALL' ||
              step.type === 'COMETH_API' ||
              step.type === 'ORIUM_API' ||
              step.type === 'ASSET_TRANSFER' ||
              step.type === 'TOKEN_ID_RANGE' ||
              step.type === 'ERC20_BALANCE') && (
              <div className="pt-8">
                <AccountCheckButton step={step} puzzleId={puzzle.id} />
              </div>
            )}

            {step.type === 'LENS_API' && (
              <div className="pt-8">
                <StepLensApiButton step={step} puzzleId={puzzle.id} />
              </div>
            )}
          </div>
        )}
      </Suspense>

      <div>{children}</div>

      {(!step || !hasBeenSolved) && (
        <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-4 sm:flex-row">
          {puzzle.steps.map((stepData) => {
            if (!stepData) return null

            const { id, stepSortWeight, hasUserCompletedStep } = stepData
            const routeParams = {
              slug,
              step: stepSortWeight,
            }

            const completed =
              !isAuthenticated && 'hasAnonUserCompletedStep' in stepData
                ? stepData.hasAnonUserCompletedStep
                : hasUserCompletedStep

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
          })}
        </div>
      )}
    </div>
  )
}

export default StepsLayout
