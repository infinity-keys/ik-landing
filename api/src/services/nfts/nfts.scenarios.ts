import type { Prisma, Nft } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NftCreateArgs>({
  nft: {
    one: {
      data: {
        tokenId: 4181927,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
        puzzle: {
          create: {
            puzzleName: 'String',
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 1077103,
          },
        },
      },
    },
    two: {
      data: {
        tokenId: 6570972,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
        puzzle: {
          create: {
            puzzleName: 'String',
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 4757182,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Nft, 'nft'>
