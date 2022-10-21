import type { Prisma, Submission } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SubmissionCreateArgs>({
  submission: {
    one: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          create: { puzzleName: 'String', path: 'String', rewardNft: 'String' },
        },
        user: { create: {} },
      },
    },
    two: {
      data: {
        data: { foo: 'bar' },
        puzzle: {
          create: { puzzleName: 'String', path: 'String', rewardNft: 'String' },
        },
        user: { create: {} },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Submission, 'submission'>
