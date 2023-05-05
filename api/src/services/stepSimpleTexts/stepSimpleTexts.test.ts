import type { StepSimpleText } from '@prisma/client'

import {
  stepSimpleTexts,
  stepSimpleText,
  createStepSimpleText,
  updateStepSimpleText,
  deleteStepSimpleText,
} from './stepSimpleTexts'
import type { StandardScenario } from './stepSimpleTexts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('stepSimpleTexts', () => {
  scenario(
    'returns all stepSimpleTexts',
    async (scenario: StandardScenario) => {
      const result = await stepSimpleTexts()

      expect(result.length).toEqual(Object.keys(scenario.stepSimpleText).length)
    }
  )

  scenario(
    'returns a single stepSimpleText',
    async (scenario: StandardScenario) => {
      const result = await stepSimpleText({
        id: scenario.stepSimpleText.one.id,
      })

      expect(result).toEqual(scenario.stepSimpleText.one)
    }
  )

  scenario('creates a stepSimpleText', async (scenario: StandardScenario) => {
    const result = await createStepSimpleText({
      input: {
        stepId: scenario.stepSimpleText.two.stepId,
        solution: 'String',
        solutionCharCount: 5941884,
      },
    })

    expect(result.stepId).toEqual(scenario.stepSimpleText.two.stepId)
    expect(result.solution).toEqual('String')
    expect(result.solutionCharCount).toEqual(5941884)
  })

  scenario('updates a stepSimpleText', async (scenario: StandardScenario) => {
    const original = (await stepSimpleText({
      id: scenario.stepSimpleText.one.id,
    })) as StepSimpleText
    const result = await updateStepSimpleText({
      id: original.id,
      input: { solution: 'String2' },
    })

    expect(result.solution).toEqual('String2')
  })

  scenario('deletes a stepSimpleText', async (scenario: StandardScenario) => {
    const original = (await deleteStepSimpleText({
      id: scenario.stepSimpleText.one.id,
    })) as StepSimpleText
    const result = await stepSimpleText({ id: original.id })

    expect(result).toEqual(null)
  })
})
