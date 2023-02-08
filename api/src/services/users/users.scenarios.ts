import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { updatedAt: '2023-02-01T18:07:53.531Z' } },
    two: { data: { updatedAt: '2023-02-01T18:07:53.531Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
