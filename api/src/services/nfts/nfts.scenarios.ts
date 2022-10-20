import type { Prisma, Nft } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NftCreateArgs>({
  nft: {
    one: {
      data: {
        tokenId: 3313544,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
        puzzle: {
          create: {
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 7635713,
          },
        },
      },
    },
    two: {
      data: {
        tokenId: 7742702,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
        puzzle: {
          create: {
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 4015215,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Nft, 'nft'>
