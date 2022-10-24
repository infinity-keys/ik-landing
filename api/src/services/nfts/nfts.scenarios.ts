import type { Prisma, Nft } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NftCreateArgs>({
  nft: {
    one: {
      data: {
        updatedAt: '2022-10-24T16:57:45Z',
        tokenId: 522497,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-10-24T16:57:45Z',
        tokenId: 8147892,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Nft, 'nft'>
