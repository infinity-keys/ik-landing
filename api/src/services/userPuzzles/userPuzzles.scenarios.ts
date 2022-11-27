import type { Prisma, UserPuzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserPuzzleCreateArgs>({
  userPuzzle: {
    one: {
      data: {
        name: 'String',
        slug: 'String',
        explanation: 'String',
        successMessage: 'String',
        challenge: 'String',
        user: { create: { updatedAt: '2022-11-27T23:04:22.546Z' } },
      },
    },
    two: {
      data: {
        name: 'String',
        slug: 'String',
        explanation: 'String',
        successMessage: 'String',
        challenge: 'String',
        user: { create: { updatedAt: '2022-11-27T23:04:22.546Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserPuzzle, 'userPuzzle'>
