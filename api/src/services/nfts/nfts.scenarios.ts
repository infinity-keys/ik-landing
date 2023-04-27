import type { Prisma, Nft } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NftCreateArgs>({
  nft: {
    one: {
      data: {
        updatedAt: '2023-02-01T18:09:54.632Z',
        tokenId: 9001367,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2023-02-01T18:09:54.632Z',
        tokenId: 548110,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Nft, 'nft'>
