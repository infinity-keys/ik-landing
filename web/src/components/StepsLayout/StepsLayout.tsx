import { PropsWithChildren, lazy, Suspense } from 'react'

import { getThumbnailProgress } from '@infinity-keys/core'
import { FindAnonStepQuery, FindStepQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { routes, useParams } from '@redwoodjs/router'

import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'

interface StepsLayoutProps extends PropsWithChildren {
  currentStepIndex: number
  puzzle: FindAnonStepQuery['puzzle'] | FindStepQuery['puzzle']
  step: FindAnonStepQuery['step'] | FindStepQuery['step']
}

const SimpleTextInput = lazy(
  () => import('src/components/SimpleTextInput/SimpleTextInput')
)
const NftCheckButton = lazy(
  () => import('src/components/NftCheckButton/NftCheckButton')
)

const StepsLayout = ({
  currentStepIndex,
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
            {step.type === 'SIMPLE_TEXT' && (
              <SimpleTextInput
                count={step.stepSimpleText.solutionCharCount}
                step={step}
                puzzleId={puzzle.id}
              />
            )}

            {step.type === 'NFT_CHECK' && (
              <NftCheckButton step={step} puzzleId={puzzle.id} />
            )}

            <div className="mx-auto mt-12 mb-12 max-w-prose p-4 md:mt-16 md:mb-20">
              {step.challenge && (
                <CollapsibleMarkdown
                  title="Challenge"
                  content={step.challenge}
                  defaultOpen
                />
              )}
            </div>
          </div>
        )}
      </Suspense>

      {children}

      <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
        {puzzle.steps.map(({ stepSortWeight }) => {
          const routeParams = {
            slug,
            step: stepSortWeight,
          }
          return (
            <ThumbnailMini
              key={stepSortWeight}
              name={`Step ${stepSortWeight.toString()}`}
              progress={getThumbnailProgress({
                currentStep: currentStepIndex + 1,
                puzzleStep: stepSortWeight,
              })}
              to={
                isAuthenticated && !puzzle.isAnon
                  ? routes.puzzleStep(routeParams)
                  : routes.anonPuzzleStep(routeParams)
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default StepsLayout
