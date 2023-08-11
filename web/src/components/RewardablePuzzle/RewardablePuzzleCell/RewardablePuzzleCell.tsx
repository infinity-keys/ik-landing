import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import RewardablePuzzle from 'src/components/RewardablePuzzle/RewardablePuzzle'

// @TODO: This query is skip auth, and the only thing we need when users are
// logged out is the puzzle cover image.
export const QUERY = gql`
  query FindRewardablePuzzleBySlug($slug: String!) {
    rewardable: rewardableBySlug(slug: $slug, type: PUZZLE) {
      id
      name
      slug
      puzzle {
        id
        coverImage
        requirements
        steps {
          stepSortWeight
          hasUserCompletedStep
        }
      }
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Rewardable not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  rewardable,
}: CellSuccessProps<FindRewardablePuzzleBySlug>) => {
  return <RewardablePuzzle rewardable={rewardable} />
}
