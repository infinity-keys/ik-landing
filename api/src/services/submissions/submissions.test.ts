import type { Submission } from '@prisma/client'

import {
  submissions,
  submission,
  createSubmission,
  updateSubmission,
  deleteSubmission,
} from './submissions'
import type { StandardScenario } from './submissions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('submissions', () => {
  scenario('returns all submissions', async (scenario: StandardScenario) => {
    const result = await submissions()

    expect(result.length).toEqual(Object.keys(scenario.submission).length)
  })

  scenario(
    'returns a single submission',
    async (scenario: StandardScenario) => {
      const result = await submission({ id: scenario.submission.one.id })

      expect(result).toEqual(scenario.submission.one)
    }
  )

  scenario('creates a submission', async () => {
    const result = await createSubmission({
      input: { puzzleId: 'String', userId: 'String' },
    })

    expect(result.puzzleId).toEqual('String')
    expect(result.userId).toEqual('String')
  })

  scenario('updates a submission', async (scenario: StandardScenario) => {
    const original = (await submission({
      id: scenario.submission.one.id,
    })) as Submission
    const result = await updateSubmission({
      id: original.id,
      input: { puzzleId: 'String2' },
    })

    expect(result.puzzleId).toEqual('String2')
  })

  scenario('deletes a submission', async (scenario: StandardScenario) => {
    const original = (await deleteSubmission({
      id: scenario.submission.one.id,
    })) as Submission
    const result = await submission({ id: original.id })

    expect(result).toEqual(null)
  })
})
