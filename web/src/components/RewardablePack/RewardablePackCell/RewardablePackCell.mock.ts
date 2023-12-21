import { RewardableType } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  rewardablePack: {
    id: '42',
  },
})

export const findRewardablePackBySlug = (/* vars, { ctx, req } */) => ({
  pack: {
    id: '42',
    type: 'PACK' as RewardableType,
    name: 'pack',
    explanation: 'string',
    slug: 'pack',
    nfts: [{ cloudinaryId: 'cid' }],
    userRewards: [{ id: '345' }],
    asParent: [
      {
        childRewardable: {
          id: '91',
          type: 'PUZZLE' as RewardableType,
          name: 'puzzle',
          slug: 'puzzle',
          puzzle: {
            steps: [
              {
                hasUserCompletedStep: true,
              },
            ],
          },
          userRewards: [{ id: '567' }],
          nfts: [{ cloudinaryId: 'cid2' }],
        },
      },
    ],
  },
})
