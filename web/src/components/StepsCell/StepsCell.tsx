import { getThumbnailProgress } from '@infinity-keys/core'
import type { FindStepQuery, FindStepQueryVariables } from 'types/graphql'

import { routes, useParams } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import SimpleTextInput from 'src/components/SimpleTextInput/SimpleTextInput'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'
import Wrapper from 'src/components/Wrapper/Wrapper'

export const QUERY = gql`
  query FindStepQuery($stepId: String, $puzzleId: String!) {
    puzzle(id: $puzzleId) {
      steps {
        id
        stepSortWeight
        hasUserCompletedStep
      }
    }
    step: optionalStep(id: $stepId) {
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

export const Loading = () => (
  <Wrapper>
    <LoadingIcon />
  </Wrapper>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStepQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

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
