import type { FindAnonRewardablePuzzleBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AnonPuzzle from 'src/components/AnonPuzzle/AnonPuzzle'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

export const QUERY = gql`
  query FindAnonRewardablePuzzleBySlug($slug: String!) {
    rewardable: rewardableBySlugWithAnonPuzzle(slug: $slug) {
      id
      name
      slug
      explanation
      successMessage
      nfts {
        cloudinaryId
      }
      puzzle {
        id
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
}: CellSuccessProps<FindAnonRewardablePuzzleBySlug>) => {
  return <AnonPuzzle rewardable={rewardable} />
}
