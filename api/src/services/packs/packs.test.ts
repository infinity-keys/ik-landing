import type { Pack } from '@prisma/client'

import { packs, pack, createPack, updatePack, deletePack } from './packs'
import type { StandardScenario } from './packs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('packs', () => {
  scenario('returns all packs', async (scenario: StandardScenario) => {
    const result = await packs()

    expect(result.length).toEqual(Object.keys(scenario.pack).length)
  })

  scenario('returns a single pack', async (scenario: StandardScenario) => {
    const result = await pack({ id: scenario.pack.one.id })

    expect(result).toEqual(scenario.pack.one)
  })

  scenario('creates a pack', async () => {
    const result = await createPack({
      input: { name: 'String', path: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.path).toEqual('String')
  })

  scenario('updates a pack', async (scenario: StandardScenario) => {
    const original = (await pack({ id: scenario.pack.one.id })) as Pack
    const result = await updatePack({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a pack', async (scenario: StandardScenario) => {
    const original = (await deletePack({ id: scenario.pack.one.id })) as Pack
    const result = await pack({ id: original.id })

    expect(result).toEqual(null)
  })
})
