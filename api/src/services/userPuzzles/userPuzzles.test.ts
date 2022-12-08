import type { UserPuzzle } from '@prisma/client'

import {
  userPuzzles,
  userPuzzle,
  createUserPuzzle,
  updateUserPuzzle,
  deleteUserPuzzle,
} from './userPuzzles'
import type { StandardScenario } from './userPuzzles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userPuzzles', () => {
  scenario('returns all userPuzzles', async (scenario: StandardScenario) => {
    const result = await userPuzzles()

    expect(result.length).toEqual(Object.keys(scenario.userPuzzle).length)
  })

  scenario(
    'returns a single userPuzzle',
    async (scenario: StandardScenario) => {
      const result = await userPuzzle({ id: scenario.userPuzzle.one.id })

      expect(result).toEqual(scenario.userPuzzle.one)
    }
  )

  scenario('creates a userPuzzle', async (scenario: StandardScenario) => {
    const result = await createUserPuzzle({
      input: {
        userId: scenario.userPuzzle.two.userId,
        name: 'String',
        slug: 'String',
        explanation: 'String',
        challenge: 'String',
      },
    })

    expect(result.userId).toEqual(scenario.userPuzzle.two.userId)
    expect(result.name).toEqual('String')
    expect(result.slug).toEqual('String')
    expect(result.explanation).toEqual('String')
    expect(result.challenge).toEqual('String')
  })

  scenario('updates a userPuzzle', async (scenario: StandardScenario) => {
    const original = (await userPuzzle({
      id: scenario.userPuzzle.one.id,
    })) as UserPuzzle
    const result = await updateUserPuzzle({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a userPuzzle', async (scenario: StandardScenario) => {
    const original = (await deleteUserPuzzle({
      id: scenario.userPuzzle.one.id,
    })) as UserPuzzle
    const result = await userPuzzle({ id: original.id })

    expect(result).toEqual(null)
  })
})
