import type {
  FindAnonStepQuery,
  FindAnonStepQueryVariables,
} from 'types/graphql'

import { routes, useParams } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import StepsLayout from 'src/components/StepsLayout/StepsLayout'

export const QUERY = gql`
  query FindAnonStepQuery($puzzleId: String!, $stepId: String, $stepNum: Int) {
    puzzle(id: $puzzleId) {
      id
      isAnon
      rewardable {
        id
        successMessage
        userRewards {
          id
        }
      }
      steps {
        id
        stepSortWeight
        hasUserCompletedStep
        hasAnonUserCompletedStep
      }
    }
    step: anonOptionalStep(
      id: $stepId
      puzzleId: $puzzleId
      stepNum: $stepNum
    ) {
      id
      challenge
      failMessage
      successMessage
      type
      hasUserCompletedStep
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
}: CellFailureProps<FindAnonStepQueryVariables>) => {
  const { slug, step } = useParams()
  const stepNum = parseInt(step, 10)

  return (
    <div>
      <p className="pb-6 text-gray-150">{error?.message}</p>
      <Button
        to={routes.anonPuzzleStep({
          slug,
          step: stepNum <= 1 ? 1 : stepNum - 1,
        })}
        text="Go to Puzzle Page"
      />
    </div>
  )
}

export const Success = ({
  step,
  puzzle,
  stepNum,
}: CellSuccessProps<FindAnonStepQuery, FindAnonStepQueryVariables> & {
  stepNum: number
}) => {
  const { isAuthenticated } = useAuth()

  // logged in users will have a userReward
  // anonymous users will have all steps completed
  const hasBeenSolved = isAuthenticated
    ? puzzle.rewardable.userRewards.length > 0
    : puzzle.steps.every((step) => step?.hasAnonUserCompletedStep)

  // find the first step that has not been solved
  // returns undefined if all have been solved
  const currentStepId = puzzle.steps.find((step) =>
    isAuthenticated
      ? !step?.hasUserCompletedStep
      : !step?.hasAnonUserCompletedStep
  )?.id

  return (
    <StepsLayout
      currentStepId={currentStepId}
      hasBeenSolved={hasBeenSolved}
      puzzle={puzzle}
      step={step}
      stepNum={stepNum}
    >
      {hasBeenSolved && (
        <div className="flex flex-col items-center justify-center">
          {puzzle.rewardable.successMessage && (
            <div className="my-8">
              <div className="markdown max-w-prose rounded border-l-4 border-brand-accent-primary bg-white/5 p-4">
                <Markdown>{puzzle.rewardable.successMessage}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </StepsLayout>
  )
}
