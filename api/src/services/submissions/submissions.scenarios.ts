import type { Prisma, Submission } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SubmissionCreateArgs>({
  submission: {
    one: { data: { puzzleId: 'String', userId: 'String' } },
    two: { data: { puzzleId: 'String', userId: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Submission, 'submission'>
