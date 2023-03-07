import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import RewardablePuzzle from 'src/components/RewardablePuzzle/RewardablePuzzle'

export const QUERY = gql`
  query FindRewardablePuzzleBySlug($slug: String!) {
    rewardable: rewardableBySlug(slug: $slug, type: PUZZLE) {
      id
      type
      name
      slug
      explanation
      successMessage
      asChildPublicParentRewardables {
        parentRewardable {
          slug
          name
          type
        }
      }
      nfts {
        cloudinaryId
      }
      puzzle {
        id
        isAnon
        steps {
          id
          stepSortWeight
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
