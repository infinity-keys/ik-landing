import { getThumbnailProgress } from '@infinity-keys/core'
import type { FindStepQuery, FindStepQueryVariables } from 'types/graphql'

import { routes, navigate, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import SimpleTextInput from 'src/components/SimpleTextInput/SimpleTextInput'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'

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

const MAKE_ATTEMPT_MUTATION = gql`
  mutation MakeAttemptMutation($stepId: String!, $data: JSON!) {
    makeAttempt(stepId: $stepId, data: $data) {
      success
    }
  }
`

export const Loading = () => <div>Loading...</div>

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
  const { slug, step: stepParam } = useParams()

  const [makeAttempt] = useMutation(MAKE_ATTEMPT_MUTATION, {
    onCompleted: (data) => {
      const nextStep = parseInt(stepParam) + 1

      if (data.makeAttempt.success) {
        if (nextStep > puzzle.steps.length) {
          navigate(routes.puzzleLanding({ slug }))
        } else {
          navigate(routes.puzzleStep({ slug, step: nextStep }))
        }
        return toast.success('Unlocked')
      }
      toast.error('Wrong')
      // @TODO: set fail message
    },
  })

  const currentStepIndex =
    puzzle.steps.findLastIndex((step) => step.hasUserCompletedStep) + 1

  return (
    <div>
      {step && (
        <>
          <SimpleTextInput
            count={step.stepSimpleText.solutionCharCount}
            stepId={step.id}
            makeAttempt={makeAttempt}
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
            name={stepSortWeight.toString()}
            step={stepSortWeight}
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
