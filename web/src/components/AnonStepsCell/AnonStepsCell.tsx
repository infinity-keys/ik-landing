import type {
  FindAnonStepQuery,
  FindAnonStepQueryVariables,
} from 'types/graphql'

import { routes, useParams } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import StepsLayout from 'src/components/StepsLayout/StepsLayout'

export const QUERY = gql`
  query FindAnonStepQuery($puzzleId: String!, $stepId: String, $stepNum: Int) {
    puzzle(id: $puzzleId) {
      id
      isAnon
      rewardable {
        id
      }
      steps {
        id
        stepSortWeight
        hasUserCompletedStep
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
      stepSimpleText {
        solutionCharCount
      }
      stepNftCheck {
        chainId
        tokenId
        contractAddress
        poapEventId
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
}: CellSuccessProps<FindAnonStepQuery, FindAnonStepQueryVariables>) => {
  // @TODO: these need to change when we can track progress of anon players
  const hasBeenSolved = false
  const currentStepIndex = 0

  return (
    <StepsLayout
      currentStepIndex={currentStepIndex}
      puzzle={puzzle}
      step={step}
    >
      {hasBeenSolved && <Button to={routes.auth()} text="Sign in to Mint" />}
    </StepsLayout>
  )
}
