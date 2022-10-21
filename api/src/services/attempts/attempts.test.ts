import type { Attempt } from '@prisma/client'

import {
  attempts,
  attempt,
  createAttempt,
  updateAttempt,
  deleteAttempt,
} from './attempts'
import type { StandardScenario } from './attempts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('attempts', () => {
  scenario('returns all attempts', async (scenario: StandardScenario) => {
    const result = await attempts()

    expect(result.length).toEqual(Object.keys(scenario.attempt).length)
  })

  scenario('returns a single attempt', async (scenario: StandardScenario) => {
    const result = await attempt({ id: scenario.attempt.one.id })

    expect(result).toEqual(scenario.attempt.one)
  })

  scenario('creates a attempt', async (scenario: StandardScenario) => {
    const result = await createAttempt({
      input: {
        stepId: scenario.attempt.two.stepId,
        userId: scenario.attempt.two.userId,
        guess: 'String',
      },
    })

    expect(result.stepId).toEqual(scenario.attempt.two.stepId)
    expect(result.userId).toEqual(scenario.attempt.two.userId)
    expect(result.guess).toEqual('String')
  })

  scenario('updates a attempt', async (scenario: StandardScenario) => {
    const original = (await attempt({ id: scenario.attempt.one.id })) as Attempt
    const result = await updateAttempt({
      id: original.id,
      input: { guess: 'String2' },
    })

    expect(result.guess).toEqual('String2')
  })

  scenario('deletes a attempt', async (scenario: StandardScenario) => {
    const original = (await deleteAttempt({
      id: scenario.attempt.one.id,
    })) as Attempt
    const result = await attempt({ id: original.id })

    expect(result).toEqual(null)
  })
})
