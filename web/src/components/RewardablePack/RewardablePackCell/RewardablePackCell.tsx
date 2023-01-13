import type { FindRewardablePackBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import RewardablePack from 'src/components/RewardablePack/RewardablePack'

export const QUERY = gql`
  query FindRewardablePackBySlug($slug: String!) {
    pack: rewardableBySlug(slug: $slug, type: PACK) {
      id
      name
      slug
      explanation
      successMessage
      pack {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Rewardable not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pack,
}: CellSuccessProps<FindRewardablePackBySlug>) => {
  return <RewardablePack rewardable={pack} />
}
