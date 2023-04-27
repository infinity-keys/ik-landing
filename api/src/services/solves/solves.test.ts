import type { Solve } from '@prisma/client'

import { solves, solve, createSolve, updateSolve, deleteSolve } from './solves'
import type { StandardScenario } from './solves.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('solves', () => {
  scenario('returns all solves', async (scenario: StandardScenario) => {
    const result = await solves()

    expect(result.length).toEqual(Object.keys(scenario.solve).length)
  })

  scenario('returns a single solve', async (scenario: StandardScenario) => {
    const result = await solve({ id: scenario.solve.one.id })

    expect(result).toEqual(scenario.solve.one)
  })

  scenario('creates a solve', async (scenario: StandardScenario) => {
    const result = await createSolve({
      input: {
        userId: scenario.solve.two.userId,
        attemptId: scenario.solve.two.attemptId,
      },
    })

    expect(result.userId).toEqual(scenario.solve.two.userId)
    expect(result.attemptId).toEqual(scenario.solve.two.attemptId)
  })

  scenario('updates a solve', async (scenario: StandardScenario) => {
    const original = (await solve({ id: scenario.solve.one.id })) as Solve
    const result = await updateSolve({
      id: original.id,
      input: { userId: scenario.solve.two.userId },
    })

    expect(result.userId).toEqual(scenario.solve.two.userId)
  })

  scenario('deletes a solve', async (scenario: StandardScenario) => {
    const original = (await deleteSolve({ id: scenario.solve.one.id })) as Solve
    const result = await solve({ id: original.id })

    expect(result).toEqual(null)
  })
})
