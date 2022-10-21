import type { Prisma, PacksOnBundles } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PacksOnBundlesCreateArgs>({
  packsOnBundles: {
    one: {
      data: {
        packSortWeight: 9271957,
        pack: {
          create: { name: 'String', path: 'String', rewardNftId: 'String' },
        },
        bundle: {
          create: { name: 'String', path: 'String', rewardNftId: 'String' },
        },
      },
    },
    two: {
      data: {
        packSortWeight: 5960895,
        pack: {
          create: { name: 'String', path: 'String', rewardNftId: 'String' },
        },
        bundle: {
          create: { name: 'String', path: 'String', rewardNftId: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PacksOnBundles, 'packsOnBundles'>
