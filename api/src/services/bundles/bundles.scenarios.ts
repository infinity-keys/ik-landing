import type { Prisma, Bundle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BundleCreateArgs>({
  bundle: {
    one: { data: { name: 'String', path: 'String', rewardNftId: 'String' } },
    two: { data: { name: 'String', path: 'String', rewardNftId: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Bundle, 'bundle'>
