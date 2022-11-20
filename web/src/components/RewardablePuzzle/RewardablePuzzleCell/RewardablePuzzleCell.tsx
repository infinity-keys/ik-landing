import type { FindRewardablePuzzleById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Rewardable from 'src/components/RewardablePuzzle/RewardablePuzzle'

export const QUERY = gql`
  query FindRewardablePuzzleById($id: String!) {
    puzzle: rewardable(id: $id) {
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
}: CellSuccessProps<FindRewardablePuzzleById>) => {
  return <Rewardable rewardable={puzzle} />
}
