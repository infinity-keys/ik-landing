import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Rewardable from 'src/components/RewardablePuzzle/RewardablePuzzle'

export const QUERY = gql`
  query FindRewardablePuzzleBySlug($slug: String!) {
    puzzle: rewardableBySlug(slug: $slug) {
      id
      createdAt
      updatedAt
      name
      slug
      explanation
      successMessage
      listPublicly
      type
      orgId
      puzzle {
        id
        steps {
          stepSortWeight
          id
          challenge
          successMessage
          type
          stepSimpleText {
            stepId
            solution
          }
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Rewardable not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  puzzle,
}: CellSuccessProps<FindRewardablePuzzleBySlug>) => {
  return <Rewardable rewardable={puzzle} />
}
