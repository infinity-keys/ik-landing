import type { Prisma, PacksOnBundles } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PacksOnBundlesCreateArgs>({
  packsOnBundles: {
    one: {
      data: {
        packSortWeight: 8628861,
        updatedAt: '2022-10-24T16:58:29Z',
        pack: {
          create: {
            updatedAt: '2022-10-24T16:58:29Z',
            name: 'String',
            path: 'String',
          },
        },
        bundle: {
          create: {
            updatedAt: '2022-10-24T16:58:29Z',
            name: 'String',
            path: 'String',
          },
        },
      },
    },
    two: {
      data: {
        packSortWeight: 1111863,
        updatedAt: '2022-10-24T16:58:29Z',
        pack: {
          create: {
            updatedAt: '2022-10-24T16:58:29Z',
            name: 'String',
            path: 'String',
          },
        },
        bundle: {
          create: {
            updatedAt: '2022-10-24T16:58:29Z',
            name: 'String',
            path: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PacksOnBundles, 'packsOnBundles'>
