import type { Step } from '@prisma/client'

import { steps, step, createStep, updateStep, deleteStep } from './steps'
import type { StandardScenario } from './steps.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('steps', () => {
  scenario('returns all steps', async (scenario: StandardScenario) => {
    const result = await steps()

    expect(result.length).toEqual(Object.keys(scenario.step).length)
  })

  scenario('returns a single step', async (scenario: StandardScenario) => {
    const result = await step({ id: scenario.step.one.id })

    expect(result).toEqual(scenario.step.one)
  })

  scenario('creates a step', async (scenario: StandardScenario) => {
    const result = await createStep({
      input: {
        updatedAt: '2023-07-20T17:30:29.680Z',
        puzzleId: scenario.step.two.puzzleId,
        solutionHint: 'String',
        defaultImage: 'String',
        category: 'SEEK',
      },
    })

    expect(result.updatedAt).toEqual(new Date('2023-07-20T17:30:29.680Z'))
    expect(result.puzzleId).toEqual(scenario.step.two.puzzleId)
    expect(result.solutionHint).toEqual('String')
    expect(result.defaultImage).toEqual('String')
    expect(result.category).toEqual('SEEK')
  })

  scenario('updates a step', async (scenario: StandardScenario) => {
    const original = (await step({ id: scenario.step.one.id })) as Step
    const result = await updateStep({
      id: original.id,
      input: { updatedAt: '2023-07-21T17:30:29.680Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-07-21T17:30:29.680Z'))
  })

  scenario('deletes a step', async (scenario: StandardScenario) => {
    const original = (await deleteStep({ id: scenario.step.one.id })) as Step
    const result = await step({ id: original.id })

    expect(result).toEqual(null)
  })
})
