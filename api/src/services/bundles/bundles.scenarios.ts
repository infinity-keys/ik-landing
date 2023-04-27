import type { Prisma, Bundle } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BundleCreateArgs>({
  bundle: {
    one: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-18T16:40:49.842Z',
            name: 'String',
            slug: 'String1398787',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String8677824',
                updatedAt: '2022-11-18T16:40:49.842Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-18T16:40:49.842Z',
            name: 'String',
            slug: 'String4921525',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String3165539',
                updatedAt: '2022-11-18T16:40:49.842Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Bundle, 'bundle'>
