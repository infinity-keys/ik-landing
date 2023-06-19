import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { updatedAt: '2023-06-19T16:45:23.747Z' } },
    two: { data: { updatedAt: '2023-06-19T16:45:23.747Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
