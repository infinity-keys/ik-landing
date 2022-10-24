import type { Prisma, Submission } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SubmissionCreateArgs>({
  submission: {
    one: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          create: {
            updatedAt: '2022-10-24T16:56:05Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
        user: { create: { updatedAt: '2022-10-24T16:56:05Z' } },
      },
    },
    two: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          create: {
            updatedAt: '2022-10-24T16:56:05Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
        user: { create: { updatedAt: '2022-10-24T16:56:05Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Submission, 'submission'>
