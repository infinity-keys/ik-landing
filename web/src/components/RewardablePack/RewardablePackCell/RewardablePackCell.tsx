import type { FindRewardablePackBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import RewardablePack from 'src/components/RewardablePack/RewardablePack'

export const QUERY = gql`
  query FindRewardablePackBySlug($slug: String!) {
    pack: rewardableBySlug(slug: $slug, type: PACK) {
      id
      name
      explanation
      slug
      completed
      nfts {
        cloudinaryId
      }
      asParent {
        childRewardable {
          id
          name
          slug
          completed
          nfts {
            cloudinaryId
          }
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
  pack,
}: CellSuccessProps<FindRewardablePackBySlug>) => {
  return <RewardablePack rewardable={pack} />
}
