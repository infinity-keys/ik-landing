import type {
  FindStepBySlugQuery,
  FindStepBySlugQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import StepsLayout from 'src/components/StepsLayout/StepsLayout'

export const QUERY = gql`
  query FindStepBySlugQuery($slug: String!, $stepNum: Int!) {
    stepBySlug(slug: $slug, stepNum: $stepNum) {
      puzzleId
      step {
        id
        type
        defaultImage
        solutionHint
        solutionImage
        stepGuideType
        stepPage {
          id
          image
          body
          showStepGuideHint
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStepBySlugQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  stepBySlug: { puzzleId, step },
}: CellSuccessProps<FindStepBySlugQuery, FindStepBySlugQueryVariables>) => {
  return <StepsLayout puzzleId={puzzleId} step={step} />
}
