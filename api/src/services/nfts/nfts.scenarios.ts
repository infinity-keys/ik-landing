import type { Prisma, Nft } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NftCreateArgs>({
  nft: {
    one: {
      data: {
        tokenId: 9611335,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
      },
    },
    two: {
      data: {
        tokenId: 7297761,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Nft, 'nft'>
