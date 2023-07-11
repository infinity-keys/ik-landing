import type { Prisma, LensKeypConnection } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LensKeypConnectionCreateArgs>({
  lensKeypConnection: {
    one: {
      data: {
        updatedAt: '2023-07-10T19:07:57.768Z',
        lensAddress: 'String',
        keypAddress: 'String',
        user: { create: { updatedAt: '2023-07-10T19:07:57.768Z' } },
      },
    },
    two: {
      data: {
        updatedAt: '2023-07-10T19:07:57.768Z',
        lensAddress: 'String',
        keypAddress: 'String',
        user: { create: { updatedAt: '2023-07-10T19:07:57.768Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  LensKeypConnection,
  'lensKeypConnection'
>
