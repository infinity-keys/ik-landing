import { RewardableType } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  claimNft: {
    id: '42',
  },
})

// Define your own mock data here:
export const findClaimNft = (/* vars, { ctx, req } */) => ({
  rewardable: {
    id: '42',
    type: 'PUZZLE' as RewardableType,
    slug: 'puzzle',
    name: 'puzzle',
    asChildPublicParentRewardables: [
      {
        parentRewardable: {
          slug: 'parent',
          name: 'parent',
          type: 'PACK' as RewardableType,
        },
      },
    ],
    nfts: [{ cloudinaryId: 'cid' }],
  },
})
