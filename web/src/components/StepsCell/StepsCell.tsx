import { getThumbnailProgress } from '@infinity-keys/core'
import type { FindStepQuery, FindStepQueryVariables } from 'types/graphql'

import { routes, useParams } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import SimpleTextInput from 'src/components/SimpleTextInput/SimpleTextInput'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'

export const QUERY = gql`
  query FindStepQuery($stepId: String, $puzzleId: String!, $stepNum: Int) {
    puzzle(id: $puzzleId) {
      id
      steps {
        id
        stepSortWeight
        hasUserCompletedStep
      }
    }
    step: optionalStep(id: $stepId, puzzleId: $puzzleId, stepNum: $stepNum) {
      id
      challenge
      failMessage
      successMessage
      type
      stepSimpleText {
        solutionCharCount
      }
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStepQueryVariables>) => {
  const { slug, step } = useParams()
  return (
    <div>
      <p className="pb-6 text-gray-150">{error?.message}</p>
      <Button
        to={routes.puzzleStep({ slug, step: parseInt(step, 10) - 1 })}
        text="Go to Puzzle Page"
      />
    </div>
  )
}

export const Success = ({
  step,
  puzzle,
}: CellSuccessProps<FindStepQuery, FindStepQueryVariables>) => {
  const { slug } = useParams()

  const currentStepIndex =
    puzzle.steps.findLastIndex((step) => step.hasUserCompletedStep) + 1

  return (
    <div>
      {step && (
        <>
          <SimpleTextInput
            count={step.stepSimpleText.solutionCharCount}
            step={step}
            numberOfSteps={puzzle.steps.length}
            puzzleId={puzzle.id}
          />

          <div className="mx-auto mt-12 mb-12 max-w-prose bg-black/10 p-4 md:mt-16 md:mb-20">
            {step.challenge && (
              <CollapsibleMarkdown
                title="Challenge"
                content={step.challenge}
                defaultOpen
              />
            )}
          </div>
        </>
      )}

      {/* @TODO: should we forward if there's only one step? */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-4 pb-12 sm:flex-row md:flex-nowrap md:pb-20">
        {puzzle.steps.map(({ stepSortWeight }) => (
          <ThumbnailMini
            key={stepSortWeight}
            name={`Step ${stepSortWeight.toString()}`}
            progress={getThumbnailProgress({
              currentStep: currentStepIndex + 1,
              puzzleStep: stepSortWeight,
            })}
            to={routes.puzzleStep({
              slug,
              step: stepSortWeight,
            })}
          />
        ))}
      </div>
    </div>
  )
}
