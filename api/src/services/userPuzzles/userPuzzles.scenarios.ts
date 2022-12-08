import type { Prisma, UserPuzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserPuzzleCreateArgs>({
  userPuzzle: {
    one: {
      data: {
        name: 'String',
        slug: 'String',
        explanation: 'String',
        challenge: 'String',
        user: { create: { updatedAt: '2022-12-08T15:23:49.288Z' } },
      },
    },
    two: {
      data: {
        name: 'String',
        slug: 'String',
        explanation: 'String',
        challenge: 'String',
        user: { create: { updatedAt: '2022-12-08T15:23:49.288Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserPuzzle, 'userPuzzle'>
