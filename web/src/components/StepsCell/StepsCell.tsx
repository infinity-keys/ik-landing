import type { FindStepQuery, FindStepQueryVariables } from 'types/graphql'

import { routes, useParams } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import StepsLayout from 'src/components/StepsLayout/StepsLayout'

export const QUERY = gql`
  query FindStepQuery($puzzleId: String!, $stepId: String, $stepNum: Int) {
    puzzle(id: $puzzleId) {
      id
      isAnon
      rewardable {
        id
        userRewards {
          id
        }
      }
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
      resourceLinks
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
  const hasBeenSolved = puzzle.rewardable.userRewards.length > 0

  const currentStepId = puzzle.steps.find(
    (step) => !step.hasUserCompletedStep
  )?.id

  return (
    <StepsLayout
      currentStepId={currentStepId}
      hasBeenSolved={hasBeenSolved}
      puzzle={puzzle}
      step={step}
    >
      {hasBeenSolved && (
        <Button
          to={routes.claim({ id: puzzle.rewardable.id })}
          text="Claim Treasure"
        />
      )}
    </StepsLayout>
  )
}
