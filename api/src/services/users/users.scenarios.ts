import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { updatedAt: '2023-01-20T19:50:11.273Z' } },
    two: { data: { updatedAt: '2023-01-20T19:50:11.273Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
