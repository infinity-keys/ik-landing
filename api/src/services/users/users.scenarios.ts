import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { updatedAt: '2022-11-15T05:59:11.147Z' } },
    two: { data: { updatedAt: '2022-11-15T05:59:11.147Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
