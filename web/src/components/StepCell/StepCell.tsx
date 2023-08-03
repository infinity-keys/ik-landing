import type {
  FindStepBySlugQuery,
  FindStepBySlugQueryVariables,
} from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import StepsLayout from 'src/components/StepsLayout/StepsLayout'

export const QUERY = gql`
  query FindStepBySlugQuery($slug: String!, $stepNum: Int!) {
    stepBySlug(slug: $slug, stepNum: $stepNum) {
      puzzleId
      step {
        id
        type
        defaultImage
        failMessage
        hasUserCompletedStep
        solutionHint
        solutionImage
        stepGuideType
        stepSortWeight
        stepPage {
          id
          image
          body
          showStepGuideHint
        }
        stepSimpleText {
          solutionCharCount
        }
        puzzle {
          steps {
            id
            stepSortWeight
            hasUserCompletedStep
          }
          rewardable {
            slug
          }
        }
      }
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
  queryResult,
}: CellFailureProps<FindStepBySlugQueryVariables>) => {
  const slug = queryResult?.variables?.slug

  return (
    <div className="p-4 text-center">
      <p className="pb-4">{error?.message}</p>
      <Button
        text={slug ? 'Return to Puzzle' : 'Return to Play Page'}
        to={slug ? routes.puzzleLanding({ slug }) : routes.play()}
      />
    </div>
  )
}

export const Success = ({
  stepBySlug: { puzzleId, step },
  queryResult,
}: CellSuccessProps<FindStepBySlugQuery, FindStepBySlugQueryVariables>) => {
  return (
    <StepsLayout puzzleId={puzzleId} step={step} queryResult={queryResult} />
  )
}
