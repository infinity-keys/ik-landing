import type { FindRewardables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Rewardables from 'src/components/RewardablePuzzle/RewardablePuzzles'

export const QUERY = gql`
  query FindRewardables {
    rewardables {
      id
      name
      slug
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No rewardables yet. '}
      <Link to={routes.newRewardable()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ rewardables }: CellSuccessProps<FindRewardables>) => {
  return <Rewardables rewardables={rewardables} />
}
