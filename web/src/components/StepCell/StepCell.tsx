import type {
  FindStepBySlugQuery,
  FindStepBySlugQueryVariables,
} from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import OldFormatMessage from 'src/components/OldFormatMessage/OldFormatMessage'
import StepsLayout from 'src/components/StepsLayout/StepsLayout'

export const QUERY = gql`
  query FindStepBySlugQuery($slug: String!, $stepNum: Int!) {
    step: stepBySlug(slug: $slug, stepNum: $stepNum) {
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
        sortWeight
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
          name
          slug
          successMessage
          nfts {
            cloudinaryId
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
      <Button to={slug ? routes.puzzleLanding({ slug }) : routes.play()}>
        {slug ? 'Return to Puzzle' : 'Return to Play Page'}
      </Button>
    </div>
  )
}

export const Success = ({
  step,
  queryResult,
}: CellSuccessProps<FindStepBySlugQuery, FindStepBySlugQueryVariables>) => {
  return step.stepPage?.length ? (
    <StepsLayout step={step} refetch={queryResult?.refetch} />
  ) : (
    <OldFormatMessage />
  )
}
