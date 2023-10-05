import type {
  FindStepBySlugQuery,
  FindStepBySlugQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import StepsLayout from 'src/components/StepsLayout/StepsLayout'

import OldFormatMessage from '../OldFormatMessage/OldFormatMessage'

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
        }
      }
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = () => {
  return <OldFormatMessage />
}

export const Success = ({
  step,
  queryResult,
}: CellSuccessProps<FindStepBySlugQuery, FindStepBySlugQueryVariables>) => {
  return <StepsLayout step={step} refetch={queryResult?.refetch} />
}
