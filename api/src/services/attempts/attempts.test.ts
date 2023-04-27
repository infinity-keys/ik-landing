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
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('attempts', () => {
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
        userId: scenario.attempt.two.userId,
        stepId: scenario.attempt.two.stepId,
        data: { foo: 'bar' },
      },
    })

    expect(result.userId).toEqual(scenario.attempt.two.userId)
    expect(result.stepId).toEqual(scenario.attempt.two.stepId)
    expect(result.data).toEqual({ foo: 'bar' })
  })

  scenario('updates a attempt', async (scenario: StandardScenario) => {
    const original = (await attempt({ id: scenario.attempt.one.id })) as Attempt
    const result = await updateAttempt({
      id: original.id,
      input: { data: { foo: 'baz' } },
    })

    expect(result.data).toEqual({ foo: 'baz' })
  })

  scenario('deletes a attempt', async (scenario: StandardScenario) => {
    const original = (await deleteAttempt({
      id: scenario.attempt.one.id,
    })) as Attempt
    const result = await attempt({ id: original.id })

    expect(result).toEqual(null)
  })
})
