import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { updatedAt: '2022-12-08T21:09:40.546Z' } },
    two: { data: { updatedAt: '2022-12-08T21:09:40.546Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
