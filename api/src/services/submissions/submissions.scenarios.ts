import type { Prisma, Submission } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SubmissionCreateArgs>({
  submission: {
    one: {
      data: {
        puzzle: {
          create: {
            puzzleName: 'String',
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 6156291,
          },
        },
        user: { create: { nonce: 'String' } },
      },
    },
    two: {
      data: {
        puzzle: {
          create: {
            puzzleName: 'String',
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 4351147,
          },
        },
        user: { create: { nonce: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Submission, 'submission'>
