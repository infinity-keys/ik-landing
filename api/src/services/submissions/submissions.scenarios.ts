import type { Prisma, Submission } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SubmissionCreateArgs>({
  submission: {
    one: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          create: {
            updatedAt: '2022-10-28T22:10:45.322Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
        user: { create: { updatedAt: '2022-10-28T22:10:45.322Z' } },
      },
    },
    two: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          create: {
            updatedAt: '2022-10-28T22:10:45.322Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
        user: { create: { updatedAt: '2022-10-28T22:10:45.322Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Submission, 'submission'>
