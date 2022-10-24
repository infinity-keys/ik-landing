import type { Prisma, Pack } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PackCreateArgs>({
  pack: {
    one: {
      data: {
        updatedAt: '2022-10-24T16:59:40Z',
        name: 'String',
        path: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-10-24T16:59:40Z',
        name: 'String',
        path: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Pack, 'pack'>
