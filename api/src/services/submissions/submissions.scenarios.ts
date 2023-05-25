import type { Prisma, Submission } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SubmissionCreateArgs>({
  submission: {
    one: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          connect: {
            rewardableId: '123',
          },
        },
        user: { create: { updatedAt: '2022-10-28T22:10:45.322Z' } },
      },
    },
    two: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          connect: {
            rewardableId: '456',
          },
        },
        user: { create: { updatedAt: '2022-10-28T22:10:45.322Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Submission, 'submission'>
