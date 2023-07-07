import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { updatedAt: '2023-07-07T14:13:30.567Z' } },
    two: { data: { updatedAt: '2023-07-07T14:13:30.567Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
