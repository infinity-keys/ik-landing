import type { FindRewardablePackBySlug } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import RewardablePack from 'src/components/RewardablePack/RewardablePack'
import Wrapper from 'src/components/Wrapper/Wrapper'

export const QUERY = gql`
  query FindRewardablePackBySlug($slug: String!) {
    pack: rewardableBySlug(slug: $slug, type: PACK) {
      id
      name
      explanation
      slug
      asParent {
        childRewardable {
          id
          name
          slug
        }
      }
    }
  }
`

export const Loading = () => (
  <Wrapper>
    <LoadingIcon />
  </Wrapper>
)

export const Empty = () => <div>Rewardable not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pack,
}: CellSuccessProps<FindRewardablePackBySlug>) => {
  return <RewardablePack rewardable={pack} />
}
