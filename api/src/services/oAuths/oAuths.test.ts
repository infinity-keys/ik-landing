import type { OAuth } from '@prisma/client'

import { oAuths, oAuth, createOAuth, updateOAuth, deleteOAuth } from './oAuths'
import type { StandardScenario } from './oAuths.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('oAuths', () => {
  scenario('returns all oAuths', async (scenario: StandardScenario) => {
    const result = await oAuths()

    expect(result.length).toEqual(Object.keys(scenario.oAuth).length)
  })

  scenario('returns a single oAuth', async (scenario: StandardScenario) => {
    const result = await oAuth({ id: scenario.oAuth.one.id })

    expect(result).toEqual(scenario.oAuth.one)
  })

  scenario('creates a oAuth', async () => {
    const result = await createOAuth({
      input: {
        state: 'String',
        codeChallenge: 'String',
        codeVerifier: 'String',
      },
    })

    expect(result.state).toEqual('String')
    expect(result.codeChallenge).toEqual('String')
    expect(result.codeVerifier).toEqual('String')
  })

  scenario('updates a oAuth', async (scenario: StandardScenario) => {
    const original = (await oAuth({ id: scenario.oAuth.one.id })) as OAuth
    const result = await updateOAuth({
      id: original.id,
      input: { state: 'String2' },
    })

    expect(result.state).toEqual('String2')
  })

  scenario('deletes a oAuth', async (scenario: StandardScenario) => {
    const original = (await deleteOAuth({ id: scenario.oAuth.one.id })) as OAuth
    const result = await oAuth({ id: original.id })

    expect(result).toEqual(null)
  })
})
