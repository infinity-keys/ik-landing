import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import RewardablePuzzle from 'src/components/RewardablePuzzle/RewardablePuzzle'

export const QUERY = gql`
  query FindRewardablePuzzleBySlug($slug: String!) {
    puzzle: rewardableBySlug(slug: $slug) {
      id
      name
      slug
      explanation
      successMessage
      puzzle {
        id
        steps {
          id
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
  return <RewardablePuzzle rewardable={puzzle} />
}
