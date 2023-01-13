import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import RewardablePuzzle from 'src/components/RewardablePuzzle/RewardablePuzzle'
import Wrapper from 'src/components/Wrapper/Wrapper'

export const QUERY = gql`
  query FindRewardablePuzzleBySlug($slug: String!) {
    puzzle: rewardableBySlug(slug: $slug, type: PUZZLE) {
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

export const Loading = () => (
  <Wrapper fullHeight>
    <LoadingIcon />
  </Wrapper>
)

export const Empty = () => <div>Rewardable not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  puzzle,
}: CellSuccessProps<FindRewardablePuzzleBySlug>) => {
  return <RewardablePuzzle rewardable={puzzle} />
}
