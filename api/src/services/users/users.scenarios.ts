import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { updatedAt: '2023-05-05T18:54:34.927Z' } },
    two: { data: { updatedAt: '2023-05-05T18:54:34.927Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
