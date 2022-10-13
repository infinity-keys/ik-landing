import type { Prisma, Pack } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PackCreateArgs>({
  pack: {
    one: { data: { name: 'String', path: 'String', rewardNftId: 'String' } },
    two: { data: { name: 'String', path: 'String', rewardNftId: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Pack, 'pack'>
