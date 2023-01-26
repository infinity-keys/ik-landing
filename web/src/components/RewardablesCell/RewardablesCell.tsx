import type { FindRewardables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import RewardablesGrid from 'src/components/RewardablesGrid'

export const QUERY = gql`
  query FindRewardables($count: Int, $page: Int, $type: RewardableType) {
    rewardablesCollection(type: $type, page: $page, count: $count) {
      rewardables {
        id
        name
        slug
        type
      }
      totalCount
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => {
  return <div className="rw-text-center">No rewardables yet.</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  rewardablesCollection,
}: CellSuccessProps<FindRewardables>) => {
  return (
    <RewardablesGrid
      rewardables={rewardablesCollection.rewardables}
      totalCount={rewardablesCollection.totalCount}
    />
  )
}
