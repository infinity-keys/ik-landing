import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AnonPuzzle from 'src/components/AnonPuzzle/AnonPuzzle'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

export const QUERY = gql`
  query FindAnonRewardablePuzzleBySlug($slug: String!) {
    # @TODO: this should still be rewardable not puzzle
    puzzle: anonPuzzleBySlug(slug: $slug) {
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
  puzzle,
}: CellSuccessProps<FindRewardablePuzzleBySlug>) => {
  return <AnonPuzzle rewardable={puzzle} />
}
