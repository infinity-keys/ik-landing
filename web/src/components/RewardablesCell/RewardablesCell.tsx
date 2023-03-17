import type { FindRewardables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import RewardablesGrid from 'src/components/RewardablesGrid'

import { GridLandingRouteType } from 'src/lib/urlBuilders'

export const QUERY = gql`
  query FindRewardables($count: Int, $page: Int, $types: [RewardableType!]!) {
    rewardablesCollection(types: $types, page: $page, count: $count) {
      rewardables {
        id
        name
        slug
        type
        puzzle {
          isAnon
          steps {
            id
            stepSortWeight
            hasUserCompletedStep
          }
        }
        nfts {
          cloudinaryId
        }
        userRewards {
          id
        }
        asParent {
          childSortWeight
          childRewardable {
            userRewards {
              id
            }
          }
        }
      }
      totalCount
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      We couldn&apos;t find anything matching your request.
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  rewardablesCollection,
  landingRoute,
}: CellSuccessProps<FindRewardables> & {
  landingRoute?: GridLandingRouteType
}) => {
  return (
    <RewardablesGrid
      rewardables={rewardablesCollection.rewardables}
      totalCount={rewardablesCollection.totalCount}
      landingRoute={landingRoute}
    />
  )
}
