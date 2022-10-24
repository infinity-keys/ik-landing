import type { Prisma, Bundle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BundleCreateArgs>({
  bundle: {
    one: {
      data: {
        updatedAt: '2022-10-24T16:59:00Z',
        name: 'String',
        path: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-10-24T16:59:00Z',
        name: 'String',
        path: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Bundle, 'bundle'>
